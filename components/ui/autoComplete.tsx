"use client";

import React, { forwardRef, useEffect, useRef, useState } from "react";
import Input, { InputProps } from "./input";
import { FcSearch } from "react-icons/fc";

interface AutocompleteProps extends InputProps {
	suggestions: string[];
}
const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(
	(
		{ suggestions, id, label, error, onChange, onBlur, value, name, required },
		ref
	) => {
		const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>(
			[]
		);

		const [inputValue, setInputValue] = useState<
			string | number | readonly string[] | undefined
		>(value || "");
		const [selectedIndex, setSelectedIndex] = useState<number>(-1);
		const autocompleteRef = useRef<HTMLDivElement>(null);

		const resetSuggestions = () => {
			setFilteredSuggestions([]);
			setSelectedIndex(-1);
		};
		// close the options list when clicked outside the element
		useEffect(() => {
			const handleClickOutside = (event: MouseEvent) => {
				if (
					autocompleteRef.current &&
					!autocompleteRef.current.contains(event.target as Node)
				) {
					resetSuggestions();
				}
			};

			document.addEventListener("mousedown", handleClickOutside);
			return () => {
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}, []);

		const triggerRHFOnchange = (value: string) => {
			onChange &&
				onChange({
					target: { value },
				} as React.ChangeEvent<HTMLInputElement>);
		};

		const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			const inputValue = event.target.value;
			const filteredSuggestions = suggestions?.filter(
				(suggestion) =>
					suggestion.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
			);
			setFilteredSuggestions(filteredSuggestions);
			setInputValue(inputValue);
			onChange && onChange(event);
			setSelectedIndex(-1);
		};

		const handleSuggestionClick = (suggestion: string) => {
			setInputValue(suggestion);
			onChange && triggerRHFOnchange(suggestion);
			resetSuggestions();
		};

		const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
			if (event.key === "ArrowDown") {
				event.preventDefault();
				setSelectedIndex((prevIndex) =>
					prevIndex < filteredSuggestions.length - 1 ? prevIndex + 1 : prevIndex
				);
			} else if (event.key === "ArrowUp") {
				event.preventDefault();
				setSelectedIndex((prevIndex) =>
					prevIndex > 0 ? prevIndex - 1 : prevIndex
				);
			} else if (event.key === "Enter" && selectedIndex !== -1) {
				event.preventDefault();
				setInputValue(filteredSuggestions[selectedIndex]);
				onChange && triggerRHFOnchange(filteredSuggestions[selectedIndex]);
				resetSuggestions();
			} else if (event.key === "Escape" || event.key === "Tab") {
				resetSuggestions();
			}
		};

		return (
			<div className="relative" ref={autocompleteRef}>
				<Input
					type="text"
					value={inputValue}
					autoComplete="off"
					addOnText={
						<span aria-hidden="true">
							<FcSearch size={22} />
						</span>
					}
					onChange={handleInputChange}
					onKeyDown={handleKeyDown}
					onBlur={onBlur}
					id={id}
					label={label}
					error={error}
					name={name}
					ref={ref}
					required={required}
				/>
				{filteredSuggestions.length > 0 && (
					<ul
						role="listbox"
						aria-expanded={filteredSuggestions.length > 0 ? "true" : "false"}
						className={`absolute left-0 w-full bg-white max-h-56 border border-gray-300 rounded-md shadow-md z-10 overflow-auto ${
							filteredSuggestions.length > 0 ? "block" : "hidden"
						} ${error ? "top-3/4" : "top-full"}`}
					>
						{filteredSuggestions.map((suggestion, index) => (
							<li
								key={index}
								onClick={() => handleSuggestionClick(suggestion)}
								onKeyDown={(event) => {
									if (event.key === "Enter") {
										handleSuggestionClick(suggestion);
									}
								}}
								tabIndex={0}
								role="option"
								aria-selected={selectedIndex === index ? "true" : "false"}
								className={`font-bold px-4 py-2 cursor-pointer focus:outline-none border-b-2 ${
									selectedIndex === index ? "bg-blue-100" : ""
								}`}
							>
								{suggestion}
							</li>
						))}
					</ul>
				)}
			</div>
		);
	}
);

Autocomplete.displayName = "Autocomplete";

export default Autocomplete;
