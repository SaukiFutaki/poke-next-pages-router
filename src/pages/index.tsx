import React, { useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRef } from "react";
import { useRouter } from "next/router";
import { Input } from "@/components/ui/input";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const search = () => {
    if (inputRef.current) {
      const searchValue = inputRef.current.value.trim();
      if (searchValue) {
        router.push(`/search/${searchValue}`);
      } else {
        return;
      }
    }
  };
  const handleSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    search();
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      search();
    }
  };

  const [nextPageUrl, setNextPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=21"
  );
  const { data: pokemon, error } = useSWR(nextPageUrl, fetcher);

  const handleNextPage = () => {
    if (pokemon && pokemon.next) {
      setNextPageUrl(pokemon.next);
    }
  };

  const handlePrevPage = () => {
    if (pokemon && pokemon.previous) {
      setNextPageUrl(pokemon.previous);
    }
  };

  if (!pokemon) return <div>loading...</div>;
  if (error) return <div>failed to load</div>;
  console.log(pokemon);

  return (
    <div className="flex justify-center items-center bg-yellow-200 h-screen w-full">
      <div  className="">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Pokémon List
        </h1>
        <div className="flex flex-row gap-2 p-2">
          <Input
            type="text"
            ref={inputRef}
            placeholder="Jika list pokemon tidak ada disini"
            onKeyDown={handleKeyPress}
            className="bg-red-300"
          />
          <Button type="submit" className="" onClick={handleSearch}>
            Search
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {pokemon.results.map((pokemon: any, index: number) => (
            <Link key={index} href={`/pokemon/${pokemon.name}`}> 
              <Card>
                <CardContent>
                  <h1 className="text-sm font-bold text-center flex justify-center items-center pt-2">
                    {pokemon.name}
                  </h1>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 p-3">
          <Button onClick={handlePrevPage}>Prev </Button>
          <Button onClick={handleNextPage}>Next </Button>
        </div>
      </div>
    </div>
  );
}
