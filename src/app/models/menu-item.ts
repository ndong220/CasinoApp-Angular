export interface MenuItem {
  label: string;
  icon: string;
  subMenuItems: SubMenuItem[];
}

export interface SubMenuItem {
  label: string;
  link: string;
}
export interface Dealer {
  id: number;
  logo: string;
  color: string;
  name: string;
  stt: number;
  Featured: boolean;
  Evaluate: number;
  PERFECT: boolean;
  Reputation: boolean;
  criteria: {
    playersFrom: boolean;
    englishWeb: boolean;
    englishSupport: boolean;
    liveChat: boolean;
    providers: number;
    paymentMethod: number;
    gameLicense: number;
    vpn: boolean;
  };
  exclusive: string;
  whyPlay: string[];
  bonus: {
    maxDeposit: string;
    match: string;
    minDeposit: string;
    wagerReq: string;
    excludeBonus: boolean;
    noDeposit: string;
  };
}


