"use client";

import { usePrefs } from "@/context/prefs";
import { ChangeEvent, useMemo } from "react";

export default function Preferences() {
  const { prefs, savePref } = usePrefs();

  const defaultLineSpace = useMemo(() => {
    const lineSpace = prefs?.lineSpace.split("-")[2];

    if (lineSpace) {
      if (lineSpace.length === 1) {
        return Number.parseInt(lineSpace);
      }

      return Number.parseInt(lineSpace) / 10;
    }

    return 1.5;
  }, [prefs?.lineSpace]);

  const defaultLetterSpace = useMemo(() => {
    const letterSpace = prefs?.letterSpace.split("-")[2];

    if (letterSpace) {
      if (letterSpace.length === 2) {
        return Number.parseInt(letterSpace) / 10;
      }

      return Number.parseInt(letterSpace) / 100;
    }

    return 0.12;
  }, [prefs?.letterSpace]);

  const handleFontSize = (e: ChangeEvent<HTMLSelectElement>) => {
    savePref("fontSize", e.target.value);
  };

  const handleFont = (e: ChangeEvent<HTMLSelectElement>) => {
    savePref("font", e.target.value);
  };

  const handleBrightness = (e: ChangeEvent<HTMLInputElement>) => {
    savePref("brightness", `brightness-${e.target.value}`);
  };

  const handleLineSpacing = (e: ChangeEvent<HTMLInputElement>) => {
    savePref("lineSpace", `line-space-${e.target.value.replace(".", "")}`);
  };

  const handleLetterSpacing = (e: ChangeEvent<HTMLInputElement>) => {
    savePref("letterSpace", `letter-space-${e.target.value.replace(".", "")}`);
  };

  const handleCursorSize = (e: ChangeEvent<HTMLSelectElement>) => {
    savePref("cursorSize", `cursor-${e.target.value}`);
  };

  const handleCursorColor = (e: ChangeEvent<HTMLSelectElement>) => {
    savePref("cursorColor", `cursor-${e.target.value}`);
  };

  const handleTheme = (e: ChangeEvent<HTMLSelectElement>) => {
    savePref("theme", e.target.value);
  };

  return (
    <div className="preferences">
      <form>
        <label>Tema</label>
        <select
          onChange={handleTheme}
          {...(prefs && { defaultValue: `${prefs.theme}` })}
        >
          <option value="light">Claro</option>
          <option value="dark">Escuro</option>
        </select>
      </form>

      <form>
        <label>Fonte</label>
        <select
          id="fontSelect"
          name="fontSelect"
          onChange={handleFont}
          {...(prefs && { defaultValue: `${prefs.font}` })}
        >
          <option value="arial">Arial</option>
          <option value="calibri">Calibri</option>
          <option value="helvetica">Helvética</option>
          <option value="tahoma">Tahoma</option>
          <option value="times-new-roman">Times New Roman</option>
          <option value="verdana">Verdana</option>
        </select>
      </form>

      <form>
        <label>Tamanho da fonte</label>
        <select
          id="sizeSelect"
          name="sizeSelect"
          onChange={handleFontSize}
          {...(prefs && { defaultValue: `${prefs.fontSize}` })}
        >
          <option value="fs-small">Pequena</option>
          <option value="fs-medium">Média</option>
          <option value="fs-large">Grande</option>
          <option value="fs-x-large">Extra-Grande</option>
        </select>
      </form>

      <form>
        <label>Faixa de brilho</label>
        <input
          type="range"
          min="0"
          max="100"
          onChange={handleBrightness}
          step="1"
          {...(prefs && { defaultValue: `${prefs.brightness.split("-")[1]}` })}
        />
      </form>

      <form>
        <label>Espaçamento entre linhas</label>
        <input
          type="range"
          min="1.5"
          max="3"
          onChange={handleLineSpacing}
          step="0.1"
          {...(prefs && { defaultValue: defaultLineSpace })}
        />
      </form>

      <form>
        <label>Espaçamento entre letras</label>
        <input
          type="range"
          min="0.01"
          max="0.2"
          onChange={handleLetterSpacing}
          step="0.01"
          {...(prefs && { defaultValue: defaultLetterSpace })}
        />
      </form>

      <form>
        <fieldset>
          <legend>Cursor</legend>
          <div>
            <label>Tamanhos</label>
            <select
              id="cursorSize"
              name="cursorSize"
              onChange={handleCursorSize}
              {...(prefs && { defaultValue: `${prefs.cursorSize}` })}
            >
              <option value="small">Pequeno</option>
              <option value="medium">Médio</option>
              <option value="large">Grande</option>
            </select>
          </div>
          <div>
            <label>Cores</label>
            <select
              id="cursorColor"
              name="cursorColor"
              onChange={handleCursorColor}
              {...(prefs && { defaultValue: `${prefs.cursorColor}` })}
            >
              <option value="white">Branco</option>
              <option value="pink">Rosa</option>
              <option value="blue">Azul</option>
              <option value="green">Verde</option>
              <option value="purple">Roxo</option>
              <option value="orange">Laranja</option>
              <option value="yellow">Amarelo</option>
              <option value="black">Preto</option>
            </select>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
