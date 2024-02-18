import useSWR from "swr";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Pokemon() {
  const router = useRouter();
  const { id } = router.query;
  const { data: pokemon, error } = useSWR(
    `https://pokeapi.co/api/v2/pokemon/${id}`,
    fetcher
  );
  if (!pokemon) return <div>loading...</div>;
  if (error) return <div>failed to load</div>;
  console.log(pokemon);
  return (
    <div className="flex justify-center items-center pt-80">
      <Link href="/">Back</Link>
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link">
            {" "}
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight ">
              {pokemon.name}
            </h4>
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-auto">
          <div className="flex justify-between space-x-4">
            <Image
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              width={200}
              height={200}
            />
            {/* <Carousel>
              <CarouselContent>
                <CarouselItem><Image src={pokemon.sprites.front_default} alt="" width={200} height={200}/></CarouselItem>
                <CarouselItem><Image src={pokemon.sprites.back_default} alt="" width={200} height={200}/></CarouselItem>
                <CarouselItem><Image src={pokemon.sprites.front_shiny} alt="" width={200} height={200}/></CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel> */}

            <div className="space-y-1">
              <h4 className="text-sm font-semibold">{pokemon.name}</h4>
              <p className="text-sm">
                Type :
                {pokemon.types
                  .map((type: { type: { name: string } }) => type.type.name)
                  .join(", ")}
              </p>
              <div className="flex items-center pt-2">
                <h1 className="text-xs text-muted-foreground">
                  {pokemon.stats.map((stat: any) => {
                    const statName = stat.stat.name;
                    const statValue = stat.base_stat;
                    return (
                      <div key={stat}>
                        <h3>
                          {statName} : {statValue}
                        </h3>
                        <Progress value={statValue} max={100} />
                      </div>
                    );
                  })}
                </h1>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
