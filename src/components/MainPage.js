import React, {
	useState,
	useRef,
	useEffect,
	useReducer,
	useLayoutEffect,
} from "react";
import {
	getLocalStorageTodos,
	getLocalFilters,
} from "./Actions/useLocalStorage";

import { lightTheme, darkTheme, GlobalStyles } from "../theme";

import { TransitionGroup, CSSTransition } from "react-transition-group";
import "react-toastify/dist/ReactToastify.css";
import "../animations.css";
import './MainPage.scss';

import useFilter from "./Actions/useFilters";
import reduceTodos from "./Actions/reduceTodos";

import uuid from "react-uuid";
import randomColor from "randomcolor";

import { ThemeProvider } from "styled-components";
import InputItem from "./TaskPage/InputItem";
import { TodoItem } from "./TaskPage/TodoItem";
import Background from "./TaskPage/Background";
import Filter from "./TaskPage/Filter";
import Submit from "./TaskPage/Submit";
import Form from "./TaskPage/Form";
import SortBy from "./TaskPage/Sortby";
import Info from "./TaskPage/Info";
import moment from "moment";

const Main = () => {
	const [todoItems, dispatch] = useReducer(
		reduceTodos,
		JSON.parse(localStorage.getItem("todos")) || []
	);
	const [filter, setFilter] = useState(localStorage.getItem("filter") || "ALL");

	const prefersDark =
		window.matchMedia &&
		window.matchMedia("(prefers-color-scheme: dark)").matches;

	const [isDarkTheme, setIsDarkTheme] = useState(
		JSON.parse(sessionStorage.getItem("theme")) || prefersDark
	);

	const [sortAsc, setSortAsc] = useState(
		JSON.parse(localStorage.getItem("sortAsc") || "false")
	);

	// input ref
	const ref = useRef();
	useEffect(() => {

		const handleKeyDown = (event) => {
			/* TODO: Refactor setTiemout blocks*/
			if (event.key === "/") {
				setTimeout(() => {
					ref.current.focus();
				}, 1);
			} else if (event.key === "Escape") {
				setTimeout(() => {
					ref.current.blur();
				}, 1);
			}
		};
		document.addEventListener("keydown", handleKeyDown);

		// Don't forget to clean up
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	useEffect(() => {
		// Sync accross tabs
		const handleStorage = () => {
			setFilter(getLocalFilters());
			dispatch({ type: "REFRESH", payload: getLocalStorageTodos() });
		};

		const handleTimeout = setTimeout(() => {
			window.addEventListener("focus", handleStorage);
		}, 300);

		return () => {
			window.removeEventListener("focus", handleStorage);
			clearTimeout(handleTimeout);
		};
	}, [todoItems]);

	// handle sort change
	const firstRef = useRef(true);
	useLayoutEffect(() => {
		if (firstRef.current) {
			firstRef.current = false;
		} else {
			dispatch({
				type: "SORT",
				payload: getLocalStorageTodos(),
				sortAsc: sortAsc,
			});
			localStorage.setItem("sortAsc", JSON.stringify(sortAsc));
			firstRef.current = false;
		}
	}, [sortAsc]);

	const handleSubmit = (event) => {
		event.preventDefault();

		const date = moment();

		if (ref.current.value && ref.current.value !== " ") {
			const newItem = {
				item: ref.current.value,
				color: randomColor(),
				isComplete: false,
				time: date,
				uuid: uuid(),
			};
			ref.current.value = null;
			dispatch({ type: "ADD_TODO", payload: newItem, sort: sortAsc });
		}
	};

	const filteredItems = useFilter({
		type: filter,
		payload: todoItems,
	});

	return (
		<ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme} className="themes">
			<>
				<GlobalStyles />
				<Background className="bg"
					title="Todo List"
				/>
				<main className="mains">
					<Form className="inputs">
						<InputItem ref={ref} placeholder="Add new todo item" />
						<Submit handleSubmit={handleSubmit} />
					</Form>
					<Filter
						handleFilter={setFilter}
						filter={filter}
						count={todoItems.length}
						activeCount={filteredItems.length}
					/>
					<SortBy sortAsc={sortAsc} handleSortAsc={setSortAsc} />
					{filteredItems.length > 0 ? (
						<TransitionGroup className="todo-list">
							{filteredItems.map((item, index) => {
								return (
									<CSSTransition
										classNames="item"
										key={item.uuid}
										timeout={{ enter: 500 + index * 500, exit: 500 }}
										mountOnEnter
										unmountOnExit
									>
										<TodoItem
											handleComplete={() =>
												dispatch({ type: "COMPLETE", uuid: item.uuid })
											}
											style={{ transitionDelay: `${index * 0.05}s` }}
											handleDelete={() => dispatch({ type: "DELETE", uuid: item.uuid })}
											dispatchEdit={dispatch}
											text={item.item}
											{...item}
										/>
									</CSSTransition>
								);
							})}
						</TransitionGroup>
					) : (
						<Info style={{ marginTop: "20vh" }}>You have no items to complete!</Info>
					)}
				</main>
			</>
		</ThemeProvider>
	);
};

export default Main;