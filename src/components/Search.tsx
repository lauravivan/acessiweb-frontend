"use client";

import useSpeechRecognition from "@/hooks/useSpeechRecognition";
import { useRef, useState } from "react";
import { SlMagnifier, SlMicrophone } from "react-icons/sl";
import { IoCloseOutline } from "react-icons/io5";
import { useHotkeys } from "react-hotkeys-hook";

type SearchProps = {
  classname: string;
  handleSearchClose?: () => void;
  placeholderText: string;
  handleSearch: (_text: string) => void;
  searchValue: string;
};

export function BtnSearch({ classname }: { classname: string }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
  };

  if (isSearchOpen) {
    return (
      <Search
        classname={classname}
        handleSearchClose={toggleSearch}
        placeholderText="Faça uma busca"
        handleSearch={() => {}}
        searchValue=""
      />
    );
  }

  return (
    <button
      className="btn-icon cursor-pointer"
      onClick={toggleSearch}
      aria-label="Abrir pesquisar"
    >
      <SlMagnifier
        className="cursor-pointer"
        aria-hidden={true}
        focusable={false}
      />
    </button>
  );
}

export default function Search({
  classname,
  placeholderText,
  handleSearch,
  searchValue,
}: SearchProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const { startListening, isListening } = useSpeechRecognition({
    onResult: (text: string) => {
      handleSearch(text);
    },
    inputId: "keyword",
    btnRef,
  });

  useHotkeys("x", () => handleSearch(""));
  useHotkeys("shift+alt+s", startListening);

  return (
    <div className={classname} role="search">
      <button
        ref={btnRef}
        className="btn-icon"
        type="button"
        onClick={startListening}
        aria-label="Pesquisar por comando de voz"
        title="shift+alt+s shift+option+s"
      >
        <SlMicrophone aria-hidden={true} focusable={false} />
        <span role="status" className="sr-only">
          {isListening && "Gravando voz..."}
        </span>
      </button>
      <form
        className={`${classname}__search-form`}
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          placeholder={placeholderText}
          name="keyword"
          id="keyword"
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
          aria-label="Campo de pesquisa"
        />
        {searchValue ? (
          <button
            type="button"
            aria-label="Apagar pesquisa"
            onClick={() => handleSearch("")}
            title="Pressione a tecla X"
          >
            <IoCloseOutline aria-hidden={true} focusable={false} />
          </button>
        ) : (
          <SlMagnifier aria-hidden={true} focusable={false} />
        )}
      </form>
    </div>
  );
}
