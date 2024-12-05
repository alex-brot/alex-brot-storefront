import { Text, clx } from "@medusajs/ui"

import { getCategoriesList, getCollectionsList } from "@lib/data"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import MedusaCTA from "@modules/layout/components/medusa-cta"
import { InstagramIcon } from "hugeicons-react"

export default async function Footer() {
  const { collections } = await getCollectionsList(0, 6)
  const { product_categories } = await getCategoriesList(0, 6)

  return (
    <footer className="border-t border-ui-border-base w-full bg-neutral-800 text-white">
      <div className="content-container flex flex-col w-full">
        <div className="flex flex-col md:flex-row md:container py-12 justify-between gap-12 md:gap-4">
          <div className="contact container md:p-0 mt-4 md:w-5/12 sm:7/12">
            <div className="md:w-5/6 flex flex-col gap-4">
              <div className="">
                <h3 className="text-5xl mb-2 text-primary-lightest font-serif">
                  Kontakt
                </h3>
                <Text>
                  Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et
                  massa mi. Aliquam in hendrerit urna. Pellentesque sit amet
                  sapien.
                </Text>
              </div>
              <div className="socials flex gap-2">
                <LocalizedClientLink
                  href="#"
                  className="bg-primary-lightest p-1 hover:bg-neutral-900"
                >
                  <InstagramIcon
                    size={38}
                    className="text-neutral-800 hover:text-primary-light"
                  />
                </LocalizedClientLink>
              </div>
              <div>
                <p>
                  <LocalizedClientLink
                    href="tel:+436641234567"
                    className="hover:underline"
                  >
                    +43 664 123 45 67
                  </LocalizedClientLink>
                </p>
                <p>
                  <LocalizedClientLink
                    href="mailto:alexbrot@gmail.com"
                    className="hover:underline"
                  >
                    alexbrot@gmail.com
                  </LocalizedClientLink>
                </p>
              </div>

              <div className="impressum hidden md:flex gap-2">
                <p>
                  <LocalizedClientLink href="/impressum" className="underline">
                    Impressum
                  </LocalizedClientLink>
                </p>
                <p>
                  <LocalizedClientLink
                    href="/datenschutz"
                    className="underline"
                  >
                    Datenschutz
                  </LocalizedClientLink>
                </p>
              </div>
            </div>
          </div>
          <div className="map flex-grow">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29844.776134952666!2d13.91694375346868!3d47.90243476775643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4773e2fdb88c7087%3A0xaea76be0d4bcd741!2sScharnstein!5e0!3m2!1sde!2sat!4v1729160951545!5m2!1sde!2sat"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="border-0 w-full h-96"
            ></iframe>
          </div>
          <div className="impressum container md:hidden flex gap-2">
            <p>
              <LocalizedClientLink href="/impressum" className="underline">
                Impressum
              </LocalizedClientLink>
            </p>
            <p>
              <LocalizedClientLink href="/datenschutz" className="underline">
                Datenschutz
              </LocalizedClientLink>
            </p>
          </div>
        </div>
        <div className="flex w-full mb-16 justify-between text-ui-fg-muted">
          <Text className="txt-compact-small">
            © {new Date().getFullYear()} Alex Store. All rights reserved.
          </Text>
          <MedusaCTA />
        </div>
      </div>
    </footer>
  )
}
