
export type Variant = 'A' | 'B';

export interface ABTestConfig {
  testId: string;
  trafficAllocation?: number; // 0.0 to 1.0 (default 1.0)
}

export class ABTestManager {
  private testId: string;
  private cookieName: string;

  constructor(testId: string) {
    this.testId = testId;
    this.cookieName = `ab_test_${testId}`;
  }

  /**
   * 그룹을 가져오거나 새로 배정합니다.
   */
  public getGroup(): Variant {
    // 1. 쿠키에서 기존 그룹 확인
    const existingGroup = this.getCookie(this.cookieName);
    if (existingGroup === 'A' || existingGroup === 'B') {
      return existingGroup as Variant;
    }

    // 2. 그룹이 없으면 랜덤 배정 (50:50)
    const newGroup: Variant = Math.random() < 0.5 ? 'A' : 'B';

    // 3. 쿠키에 저장 (30일)
    this.setCookie(this.cookieName, newGroup, 30);

    return newGroup;
  }

  /**
   * 노출 이벤트를 분석 도구로 전송합니다.
   */
  public trackExposure(group: Variant): void {
    const eventName = 'view_ab_test';
    const eventProperties = {
      test_id: this.testId,
      variant: group,
      timestamp: new Date().toISOString(),
    };

    console.log(`[AB Test] ${this.testId} assigned to group: ${group}`);

    // Amplitude 연동 (index.html에 스크립트가 로드되어 있다고 가정)
    if (typeof window !== 'undefined' && (window as any).amplitude) {
      const amp = (window as any).amplitude;
      
      try {
        // Modern Amplitude SDK (Analytics Browser SDK)
        // track 메서드가 직접 노출되어 있음
        if (typeof amp.track === 'function') {
           amp.track(eventName, eventProperties);
           
           if (amp.Identify) {
             const identify = new amp.Identify();
             identify.set(this.cookieName, group);
             amp.identify(identify);
           }
        } 
        // Legacy Amplitude SDK (amplitude-js)
        // getInstance()를 통해 접근해야 함
        else if (typeof amp.getInstance === 'function') {
           const instance = amp.getInstance();
           instance.logEvent(eventName, eventProperties);
           
           if (amp.Identify) {
             const identify = new amp.Identify().set(this.cookieName, group);
             instance.identify(identify);
           }
        }
      } catch (e) {
        console.warn('[AB Test] Amplitude tracking failed', e);
      }
    }
  }

  /**
   * 쿠키 유틸리티: 가져오기
   */
  private getCookie(name: string): string | null {
    if (typeof document === 'undefined') return null;
    
    try {
      const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      if (match) return match[2];
    } catch (e) {
      console.warn('[AB Test] Cookie access failed', e);
    }
    return null;
  }

  /**
   * 쿠키 유틸리티: 저장하기
   */
  private setCookie(name: string, value: string, days: number): void {
    if (typeof document === 'undefined') return;

    try {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      const expires = "expires=" + date.toUTCString();
      document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
    } catch (e) {
      console.warn('[AB Test] Cookie set failed', e);
    }
  }
}
