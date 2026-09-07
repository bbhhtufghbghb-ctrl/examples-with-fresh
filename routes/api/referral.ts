import { Handlers } from "$fresh/server.ts";
import { getReferralStats, createReferralCode, verifyReferralCode, getReferrerAddress } from "../../utils.ts";

export const handler: Handlers = {
  async GET(req) {
    const url = new URL(req.url);
    const address = url.searchParams.get("address");
    
    if (!address) {
      return new Response(JSON.stringify({ error: "Address required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    
    try {
      const stats = await getReferralStats(address);
      return new Response(JSON.stringify(stats), {
        headers: { "Content-Type": "application/json" }
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  },
  
  async POST(req) {
    try {
      const { address } = await req.json();
      
      if (!address) {
        return new Response(JSON.stringify({ error: "Address required" }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }
      
      const code = await createReferralCode(address);
      return new Response(JSON.stringify({ code, address }), {
        headers: { "Content-Type": "application/json" }
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  },
  
  async PUT(req) {
    try {
      const { code } = await req.json();
      const isValid = await verifyReferralCode(code);
      const referrer = isValid ? await getReferrerAddress(code) : null;
      
      return new Response(JSON.stringify({ isValid, referrer }), {
        headers: { "Content-Type": "application/json" }
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }
  }
};
