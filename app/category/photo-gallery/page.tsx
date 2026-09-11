import Image from "next/image";
import {
  AboutUsShell,
  makeAboutUsMetadata,
} from "@/components/AboutUsShell";
import { photoGallery } from "@/lib/content/about-us";

export const metadata = makeAboutUsMetadata("Photo Gallery");

export default function PhotoGalleryPage() {
  return (
    <AboutUsShell
      title="Photo Gallery"
      currentHref="/category/photo-gallery"
      lede="Moments from the Embassy’s diplomatic work, community engagement, and Ethiopia’s landmarks."
      hero={{
        src: "/legacy-site/images/hero-images/adwa-2024-02-11-65c847a8a5a08.jpg",
        alt: "Embassy photo gallery",
        position: "object-center",
      }}
    >
      <p className="border-l-2 border-gold pl-4 text-base leading-relaxed text-charcoal sm:text-lg">
        A selection of photographs from Embassy events and Ethiopia’s cultural
        and national landmarks.
      </p>

      <ul className="mt-10 grid gap-5 sm:grid-cols-2">
        {photoGallery.map((item) => (
          <li key={item.src} className="group">
            <figure>
              <div className="relative aspect-[4/3] overflow-hidden border border-line bg-canvas">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, 40vw"
                />
              </div>
              <figcaption className="mt-3 text-sm text-muted">
                {item.caption}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </AboutUsShell>
  );
}
