import { useState } from "preact/hooks";
import { swapTokens, getBestPrice } from "../utils/aggregator.ts";

interface WalletSwapProps {
  userAddress?: string;
}

export default function WalletSwap({ userAddress }: WalletSwapProps) {
  const [fromToken, setFromToken] = useState("ETH");
  const [toToken, setToToken] = useState("USDC");
  const [amount, setAmount] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSwap = async () => {
    if (!userAddress) {
      alert("Please connect wallet first!");
      return;
    }
    
    setLoading(true);
    try {
      const bestPrice = await getBestPrice(fromToken, toToken, amount);
      const swapResult = await swapTokens({
        fromToken,
        toToken,
        amount,
        userAddress,
        referralCode,
        bestPrice
      });
      setResult(`Swap completed! TX: ${swapResult.txHash}`);
    } catch (error) {
      setResult(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg max-w-md mx-auto">
      <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        DEX Aggregator Swap
      </h2>
      
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            From
          </label>
          <select 
            value={fromToken}
            onChange={(e) => setFromToken(e.currentTarget.value)}
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          >
            <option>ETH</option>
            <option>WBTC</option>
            <option>USDC</option>
            <option>DAI</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            To
          </label>
          <select 
            value={toToken}
            onChange={(e) => setToToken(e.currentTarget.value)}
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          >
            <option>USDC</option>
            <option>ETH</option>
            <option>WBTC</option>
            <option>DAI</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.currentTarget.value)}
            placeholder="0.0"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Referral Code (optional)
          </label>
          <input
            type="text"
            value={referralCode}
            onChange={(e) => setReferralCode(e.currentTarget.value)}
            placeholder="Enter referral code"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600"
          />
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Get 0.1% discount with referral!
          </p>
        </div>

        <button
          onClick={handleSwap}
          disabled={loading || !userAddress}
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Swapping..." : "Swap"}
        </button>

        {result && (
          <div class={`mt-4 p-3 rounded-lg ${result.includes("Error") ? "bg-red-100 dark:bg-red-900" : "bg-green-100 dark:bg-green-900"}`}>
            <p class="text-sm break-all">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}
