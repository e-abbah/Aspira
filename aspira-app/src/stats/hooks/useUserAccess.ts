// Stand-in for real auth/subscription state. Once auth exists, this hook
// should read from that context/session instead of returning a constant —
// every consumer of premium-gating already depends on this single hook,
// so nothing downstream needs to change.
export function useUserAccess() {
  return {
    isPremium: false,
  };
}