import {
  backgroundColors,
  contentWidthArr,
  fontColors,
  fontSizeOptions,
  defaultArticleState,
  fontFamilyOptions,
  type OptionType,
  type ArticleStateType,
} from '@/constants/articleProps';
import { RadioGroup } from '@/ui/radio-group';
import { Select } from '@/ui/select';
import { Separator } from '@/ui/separator';
import { Text } from '@/ui/text';
import { clsx } from 'clsx';
import { useState, useRef, useEffect } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import type React from 'react';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
  onApply: (settings: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
  onApply,
}: ArticleParamsFormProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLElement | null>(null);
  function handleClick(): void {
    setIsOpen(!isOpen);
  }
  function handleOutsideClick(event: MouseEvent): void {
    if (
      panelRef.current &&
      event.target instanceof Node &&
      !panelRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  }
  useEffect(
    function (): () => void {
      if (isOpen) {
        document.addEventListener('mousedown', handleOutsideClick);
      }

      return function () {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    },
    [isOpen]
  );
  const [formState, setFormState] = useState(defaultArticleState);
  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    onApply(formState);
  }
  function handleReset(): void {
    setFormState(defaultArticleState);
    onApply(defaultArticleState);
  }
  function handleFontFamilyChange(selectedOption: OptionType): void {
    setFormState(function (prevState) {
      return {
        ...prevState,
        fontFamilyOption: selectedOption,
      };
    });
  }
  function handleFontSizeChange(selectedOption: OptionType): void {
    setFormState(function (prevState) {
      return {
        ...prevState,
        fontSizeOption: selectedOption,
      };
    });
  }
  function handleFontColorChange(selectedOption: OptionType): void {
    setFormState(function (prevState) {
      return {
        ...prevState,
        fontColor: selectedOption,
      };
    });
  }
  function handleBackgroundColorChange(selectedOption: OptionType): void {
    setFormState(function (prevState) {
      return {
        ...prevState,
        backgroundColor: selectedOption,
      };
    });
  }
  function handleContentWidthChange(selectedOption: OptionType): void {
    setFormState(function (prevState) {
      return {
        ...prevState,
        contentWidth: selectedOption,
      };
    });
  }
  return (
    <>
      <ArrowButton isOpen={isOpen} onClick={handleClick} />
      <aside
        ref={panelRef}
        className={clsx(styles.container, isOpen && styles.container_open)}
      >
        <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
          <Text as={'h2'} size={31} weight={800} uppercase>
            Задайте параметры
          </Text>
          <Select
            onChange={handleFontFamilyChange}
            selected={formState.fontFamilyOption}
            options={fontFamilyOptions}
            title="Шрифт"
          />
          <RadioGroup
            onChange={handleFontSizeChange}
            name="font-size"
            options={fontSizeOptions}
            selected={formState.fontSizeOption}
            title="Размер шрифта"
          />
          <Select
            onChange={handleFontColorChange}
            selected={formState.fontColor}
            options={fontColors}
            title="Цвет шрифта"
          />
          <Separator />
          <Select
            onChange={handleBackgroundColorChange}
            selected={formState.backgroundColor}
            options={backgroundColors}
            title="Цвет фона"
          />
          <Select
            onChange={handleContentWidthChange}
            options={contentWidthArr}
            selected={formState.contentWidth}
            title="Ширина контента"
          />
          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </>
  );
};
