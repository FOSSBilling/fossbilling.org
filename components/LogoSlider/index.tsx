import Image from 'next/image';

const logos = [
  { name: "cPanel", src: "/img/logos/cpanel.svg" },
  { name: "Plesk", src: "/img/logos/plesk.png" },
  { name: "DirectAdmin", src: "/img/logos/directadmin.png" },
  { name: "ISPConfig", src: "/img/logos/ispconfig.png" },
  { name: "HestiaCP", src: "/img/logos/hestiacp.png" },
  { name: "PayPal", src: "/img/logos/paypal.svg" },
  { name: "Stripe", src: "/img/logos/stripe.png" },
  { name: "Mollie", src: "/img/logos/mollie.png" },
  { name: "Namecheap", src: "/img/logos/namecheap.png" }
];

export function LogoSlider() {
  return (
    <div className="logo-slider relative overflow-hidden py-8">
      <div className="marquee-track flex whitespace-nowrap">
        {[...logos, ...logos, ...logos].map((logo, index) => (
          <div
            key={index}
            className="mx-8 flex items-center justify-center"
            style={{ height: "32px", minWidth: "150px" }}
          >
            <Image
              src={logo.src}
              alt={logo.name}
              width={150}
              height={32}
              className="logo-img transition-all duration-300"
              style={{ height: "100%", width: "auto", objectFit: "contain" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
