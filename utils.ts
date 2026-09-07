// utils.ts
export interface SwapParams {
  fromToken: string;
  toToken: string;
  amount: string;
  userAddress: string;
  referralCode?: string;
  bestPrice: any;
}

export interface SwapResult {
  txHash: string;
  referralReward?: string;
  discount?: string;
}

// محاكاة للحصول على أفضل سعر من عدة DEXs
export async function getBestPrice(from: string, to: string, amount: string) {
  // في الواقع: استدعاء 1inch API أو 0x API
  return {
    dex: "Uniswap",
    price: (parseFloat(amount) * 1800).toString(),
    gasEstimate: "0.001"
  };
}

// محاكاة لتنفيذ الـ Swap مع منطق الإحالة
export async function swapTokens(params: SwapParams): Promise<SwapResult> {
  const { fromToken, toToken, amount, userAddress, referralCode, bestPrice } = params;
  
  // حساب الرسوم (0.3% من المبلغ)
  const fee = parseFloat(amount) * 0.003;
  
  let referralReward = "0";
  let discount = "0";
  
  // إذا كان هناك كود إحالة، قم بحساب المكافأة والخصم
  if (referralCode) {
    // تحقق من صحة الكود (في الواقع: استدعاء قاعدة بيانات أو عقد ذكي)
    const isValid = await verifyReferralCode(referralCode);
    
    if (isValid) {
      // 0.1% للمحيل
      referralReward = (fee * 0.333).toString();
      // 0.1% خصم للمستخدم
      discount = (fee * 0.333).toString();
      // 0.1% للمنصة (أنت)
      
      // تسجيل الإحالة في قاعدة البيانات
      await saveReferralTransaction({
        referrer: await getReferrerAddress(referralCode),
        user: userAddress,
        amount: amount,
        reward: referralReward,
        code: referralCode
      });
    }
  }
  
  // محاكاة تنفيذ الـ Swap
  return {
    txHash: `0x${Math.random().toString(16).substring(2, 66)}`,
    referralReward,
    discount
  };
}

// دوال الإحالات (تخزين مؤقت في الذاكرة)
const referralDB = new Map<string, { referrer: string; code: string }>();

export async function createReferralCode(address: string): Promise<string> {
  const code = address.substring(0, 8).toUpperCase();
  referralDB.set(code, { referrer: address, code });
  return code;
}

export async function verifyReferralCode(code: string): Promise<boolean> {
  return referralDB.has(code);
}

export async function getReferrerAddress(code: string): Promise<string> {
  return referralDB.get(code)?.referrer || "";
}

export async function saveReferralTransaction(data: any) {
  // في الواقع: حفظ في قاعدة بيانات SQLite أو MongoDB
  console.log("📝 Referral saved:", data);
}

export async function getReferralStats(address: string) {
  // في الواقع: استرجاع من قاعدة البيانات
  return {
    totalRewards: "0.5 ETH",
    totalSwaps: 42,
    referralCount: 7
  };
}
