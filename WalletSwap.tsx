import { useSignal } from "@preact/signals";

export default function WalletSwap() {
  const walletAddress = useSignal<string | null>(null);
  const statusMessage = useSignal<string>("Ready to connect");

  // Function to connect to Phantom or Solflare wallet
  const connectWallet = async () => {
    try {
      const provider = (window as any).solana;
      if (provider?.isPhantom || provider?.isSolflare) {
        const response = await provider.connect();
        walletAddress.value = response.publicKey.toString();
        statusMessage.value = "Connected Successfully!";
      } else {
        alert("Please install Phantom or Solflare wallet extension!");
        window.open("https://phantom.app/", "_blank");
      }
    } catch (err) {
      console.error(err);
      statusMessage.value = "Connection failed";
    }
  };

  // Function to trigger Jupiter Swap with your Referral Account
  const executeSwap = () => {
    if (!walletAddress.value) {
      alert("Please connect your wallet first!");
      return;
    }
    
    // Replace this with your actual Solana wallet address to receive referral fees
    const myReferralAccount = walletAddress.value; 

    // Redirect to Jupiter terminal/swap with integrated referral fee
    const jupiterUrl = `https://jup.ag/swap/SOL-USDC?referrer=${myReferralAccount}`;
    window.open(jupiterUrl, "_blank");
  };

  return (
    <div class="w-full">
      <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-4 text-center">
        <p class="text-sm text-slate-300 mb-3">
          {walletAddress.value ? `Connected: ${walletAddress.value.slice(0, 4)}...${walletAddress.value.slice(-4)}` : "Connect Phantom or Solflare Wallet"}
        </p>
        
        {!walletAddress.value ? (
          <button 
            onClick={connectWallet}
            class="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 font-medium rounded-xl transition duration-200 text-sm shadow-lg shadow-indigo-600/20 text-white"
          >
            Connect Wallet
          </button>
        ) : (
          <button 
            onClick={executeSwap}
            class="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 font-medium rounded-xl transition duration-200 text-sm shadow-lg shadow-emerald-600/20 text-white"
          >
            Open Swap & Earn Fees
          </button>
        )}
      </div>
      <p class="text-xs text-center text-slate-500">{statusMessage.value}</p>
    </div>
  );
}

