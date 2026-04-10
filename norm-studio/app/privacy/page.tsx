import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#2D2926] text-[#FDF9F3] pt-32 pb-24 px-6 md:px-12 font-satoshi">
      <div className="max-w-2xl mx-auto">
        <div className="text-left mb-12">
          <Link href="/" className="text-[10px] tracking-[0.2em] uppercase text-[#FDF9F3]/50 hover:text-[#FF4D00] transition-colors inline-block">
            ← Back to Home
          </Link>
        </div>
        <div className="text-center">
          <h1 className="font-cormorant text-5xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-[#FDF9F3]/60 mb-12 leading-relaxed">
            Norm Studio respects your privacy. We only collect the necessary information required to process your bookings and shop orders. We will never sell your data to third parties.
          </p>
        </div>
      </div>
    </main>
  );
}