import { useState } from "preact/hooks";
import WalletSwap from "../components/WalletSwap.tsx";
import { createReferralCode, getReferralStats } from "../utils.ts";

export default function Home() {
  const [connected, setConnected] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [stats, setStats] = useState<any>(null);
  const [userAddress, setUserAddress] = useState("");

  const connectWallet = () => {
    const mockAddress = "0x" + Math.random().toString(16).substring(2, 42);
    setUserAddress(mockAddress);
    setConnected(true);
    const code = createReferralCode(mockAddress);
    setReferralCode(code);
    getReferralStats(mockAddress).then(setStats);
  };

  return (
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-10">
          <h1 class="text-4xl font-extrabold text-gray-900 dark:text-white">
            DEX Aggregator
          </h1>
          <p class="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Best prices across multiple DEXs + Earn with referrals!
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="md:col-span-1 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg h-fit">
            <h3 class="font-bold text-gray-900 dark:text-white mb-4">
              Wallet
            </h3>
            {!connected ? (
              <button
                onClick={connectWallet}
                class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition"
              >
                Connect Wallet
              </button>
            ) : (
              <div class="space-y-3">
                <p class="text-sm text-gray-600 dark:text-gray-400 break-all">
                  <span class="font-semibold">Address:</span> {userAddress.substring(0, 10)}...
                </p>
                <div class="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                  <p class="text-xs text-gray-500 dark:text-gray-400">Your Referral Code</p>
                  <p class="text-lg font-mono font-bold text-blue-600 dark:text-blue-400">
                    {referralCode}
                  </p>
                  <button
                    onClick={() => navigator.clipboard.writeText(referralCode)}
                    class="mt-1 text-xs text-blue-500 hover:text-blue-700"
                  >
                    Copy
                  </button>
                </div>
                {stats && (
                  <div class="border-t border-gray-200 dark:border-gray-700 pt-3">
                    <p class="text-sm">
                      <span class="text-gray-500 dark:text-gray-400">Rewards:</span>{" "}
                      <span class="font-bold text-green-600 dark:text-green-400">
                        {stats.totalRewards}
                      </span>
                    </p>
                    <p class="text-sm">
                      <span class="text-gray-500 dark:text-gray-400">Swaps:</span>{" "}
                      <span class="font-bold">{stats.totalSwaps}</span>
                    </p>
                    <p class="text-sm">
                      <span class="text-gray-500 dark:text-gray-400">Referrals:</span>{" "}
                      <span class="font-bold">{stats.referralCount}</span>
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div class="md:col-span-2">
            <WalletSwap userAddress={connected ? userAddress : undefined} />
          </div>
        </div>

        <div class="mt-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 class="font-bold text-gray-900 dark:text-white mb-2">
            How Referrals Work
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
              <span class="font-bold text-green-600 dark:text-green-400">1</span>
              <p class="text-gray-600 dark:text-gray-300">Share your referral code with friends</p>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
              <span class="font-bold text-green-600 dark:text-green-400">2</span>
              <p class="text-gray-600 dark:text-gray-300">They use your code when swapping</p>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
              <span class="font-bold text-green-600 dark:text-green-400">3</span>
              <p class="text-gray-600 dark:text-gray-300">You earn 0.1% of their swap fees!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
