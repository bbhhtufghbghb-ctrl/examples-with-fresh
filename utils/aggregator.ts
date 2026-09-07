```typescript
// utils/aggregator.ts
// هذا الملف للتفاعل مع DEX APIs الحقيقية

interface DexQuote {
  dex: string;
  price: string;
  gasEstimate: string;
  liquidity: string;
}

export async function fetchQuotes(from: string, to: string, amount: string): Promise<DexQuote[]> {
  // في الواقع: استدعاء APIs من DEXs المختلفة
  
  // محاكاة استجابة من عدة DEXs
  return [
    { dex: "Uniswap", price: "1800.50", gasEstimate: "0.0012", liquidity: "1.2M" },
    { dex: "SushiSwap", price: "1800.45", gasEstimate: "0.0015", liquidity: "800K" },
    { dex: "PancakeSwap", price: "1800.55", gasEstimate: "0.0009", liquidity: "2.1M" },
    { dex: "1inch", price: "1800.42", gasEstimate: "0.0011", liquidity: "3.4M" },
  ];
}

export async function getBestAggregatedPrice(from: string, to: string, amount: string) {
  const quotes = await fetchQuotes(from, to, amount);
  
  // اختر أفضل سعر
  const best = quotes.reduce((a, b) => 
    parseFloat(a.price) < parseFloat(b.price) ? a : b
  );
  
  return {
    ...best,
    recommendedDex: best.dex
  };
}

// دالة لتقسيم الـ Swap بين عدة DEXs للحصول على أفضل سعر إجمالي
export async function getSplitRoute(from: string, to: string, amount: string) {
  const quotes = await fetchQuotes(from, to, amount);
  
  // خوارزمية بسيطة لتوزيع المبلغ على أفضل 2 DEXs
  const sorted = quotes.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  const split = {
    routes: [
      { dex: sorted[0].dex, percentage: 60, price: sorted[0].price },
      { dex: sorted[1].dex, percentage: 40, price: sorted[1].price }
    ],
    averagePrice: (parseFloat(sorted[0].price) * 0.6 + parseFloat(sorted[1].price) * 0.4).toString()
  };
  
  return split;
}
```

