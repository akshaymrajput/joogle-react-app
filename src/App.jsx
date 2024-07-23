import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Paths } from "./components/Paths";

const App = () => {
    const [darkTheme, setDarkTheme] = useState(false);

    return (
        <div className={darkTheme ? "dark" : ""}>
            <div className="bg-purple-200 dark:bg-gray-900 dark:text-gray-200 min-h-screen transition-colors duration-300 ease-in-out">
                <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
                <Paths />
                <Footer />
            </div>
        </div>
    );
};

export default App;
