import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";

export default function Home() {
  return (
    <div class="px-4 py-8 mx-auto bg-slate-950 min-h-screen text-white flex flex-col items-center justify-center">
      <div class="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
        <h1 class="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
          Solana Swap Station
        </h1>
        <p class="text-xs text-slate-400 text-center mb-6">
          Fast, decentralized, and optimized for instant routing.
        </p>

        {/* Solana Wallet Connection and Swap Widget Section */}
        <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-4 text-center">
          <p class="text-sm text-slate-300 mb-3">Connect Phantom or Solflare Wallet</p>
          <button class="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 font-medium rounded-xl transition duration-200 text-sm shadow-lg shadow-indigo-600/20">
            Connect Wallet
          </button>
        </div>

        <div class="text-center text-xs text-slate-500 mt-4">
          Secured by Jupiter & Solana Network
        </div>
      </div>
    </div>
  );
}
