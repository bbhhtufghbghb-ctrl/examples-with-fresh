import { useState } from "preact/hooks";

export default function ReferralPage() {
  const [address, setAddress] = useState("");
  const [code, setCode] = useState("");
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    if (!address) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/referral/stats?address=${address}`);
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createCode = async () => {
    if (!address) return;
    try {
      const res = await fetch("/api/referral/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address })
      });
      const data = await res.json();
      setCode(data.code);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div class="max-w-2xl mx-auto py-12 px-4">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Referral Dashboard
      </h1>
      
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Your Wallet Address
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.currentTarget.value)}
            placeholder="0x..."
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
          <div class="flex gap-2 mt-2">
            <button
              onClick={createCode}
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition"
            >
              Generate Code
            </button>
            <button
              onClick={fetchStats}
              class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm transition"
            >
              Get Stats
            </button>
          </div>
        </div>
        
        {code && (
          <div class="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
            <p class="text-sm text-gray-500 dark:text-gray-400">Your Referral Code</p>
            <p class="text-2xl font-mono font-bold text-green-600 dark:text-green-400">
              {code}
            </p>
          </div>
        )}
        
        {stats && (
          <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Statistics</h3>
            <div class="grid grid-cols-3 gap-4">
              <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-center">
                <p class="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {stats.totalRewards || "0"}
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">Total Rewards</p>
              </div>
              <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-center">
                <p class="text-2xl font-bold text-green-600 dark:text-green-400">
                  {stats.totalSwaps || 0}
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">Total Swaps</p>
              </div>
              <div class="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg text-center">
                <p class="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {stats.referralCount || 0}
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400">Referrals</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
