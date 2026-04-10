import Link from "next/link";

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-[#2D2926] text-[#FDF9F3] pt-32 pb-24 px-6 md:px-12 font-satoshi">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-[10px] tracking-[0.2em] uppercase text-[#FDF9F3]/50 hover:text-[#FF4D00] transition-colors mb-12 inline-block">
          ← Back to Home
        </Link>
        
        <h1 className="font-cormorant text-5xl md:text-7xl font-bold mb-16 tracking-tight">Frequently Asked<br/>Questions</h1>

        <div className="space-y-16">
          <section id="wear" className="scroll-mt-32">
            <h2 className="text-[#FF4D00] text-sm tracking-widest uppercase mb-4">01. What to wear?</h2>
            <p className="text-[#FDF9F3]/70 leading-relaxed">
              Clay is messy. We provide aprons, but please wear comfortable clothes and shoes that you don't mind getting a little dusty. We recommend trimming long fingernails before throwing on the wheel.
            </p>
          </section>

          <section id="groups" className="scroll-mt-32">
            <h2 className="text-[#FF4D00] text-sm tracking-widest uppercase mb-4">02. Group bookings</h2>
            <p className="text-[#FDF9F3]/70 leading-relaxed">
              We happily accommodate private groups, corporate team building, and special events. Please use the "Other / Group Request" form in our Bookings section to get a custom quote.
            </p>
          </section>

          <section id="firing" className="scroll-mt-32">
            <h2 className="text-[#FF4D00] text-sm tracking-widest uppercase mb-4">03. Firing timelines</h2>
            <p className="text-[#FDF9F3]/70 leading-relaxed">
              Pottery is a slow art. After your session, pieces must dry completely before their first (bisque) fire, followed by glazing and a second (glaze) fire. Expect your finished pieces to be ready for collection in 3 to 4 days.
            </p>
          </section>

          <section id="shipping" className="scroll-mt-32">
            <h2 className="text-[#FF4D00] text-sm tracking-widest uppercase mb-4">04. Shipping policy</h2>
            <p className="text-[#FDF9F3]/70 leading-relaxed">
              We offer delivery across Kenya for a flat rate of KES 150. Orders are dispatched within 3-5 business days. Studio pickup in Gigiri is always free.
            </p>
          </section>

          <section id="cancel" className="scroll-mt-32">
            <h2 className="text-[#FF4D00] text-sm tracking-widest uppercase mb-4">05. Cancellations</h2>
            <p className="text-[#FDF9F3]/70 leading-relaxed">
              Cancellations made 48 hours before your session are fully refundable. Late cancellations or no-shows forfeit their booking fee, as studio space is highly limited.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}