import PersonCard from "@modules/team/components/person-card";
import { alex, devs } from "@modules/team/static/persons";

export default function TeamPage() {
  return (
    <>
      <div className="h-16"></div>
      <section id="team" className="bg-primary-lightest text-neutral-900">
        <div className="container flex flex-col justify-center">
          <div>
            <div className="h-16"></div>
            <div className="flex flex-col gap-6">
              <PersonCard
                name={alex.name}
                description={alex.description}
                image={alex.image}
                size="large"
              />
              <div className="devs flex flex-col gap-4 items-center mb-16 text-center md:text-left">
                <h3 className="w-full text-4xl font-bold">Die Entwickler</h3>
                <div className="flex flex-col max-w-full md:gap-4 md:flex-row overflow-x-auto">
                  {devs.map((dev, index) => (
                    <PersonCard
                      key={index}
                      name={dev.name}
                      description={dev.description}
                      image={dev.image}
                      size="small"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}