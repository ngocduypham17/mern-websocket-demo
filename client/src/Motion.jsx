import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [isFirstVisible, setIsFirstVisible] = useState(false);
  const [isSecondVisible, setIsSecondVisible] = useState(false);

  const toggleFirstVisibility = () => {
    setIsFirstVisible(!isFirstVisible);
    setIsSecondVisible(false);
  };

  const toggleSecondVisibility = () => {
    setIsSecondVisible(!isSecondVisible);
    setIsFirstVisible(false);
  };

  return (
    <div>
      <button onClick={toggleFirstVisibility}>Toggle First Div</button>
      <button onClick={toggleSecondVisibility}>Toggle Second Div</button>
      <AnimatePresence mode='wait'>
        {isFirstVisible && (
          <motion.div
            key="first"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut", stiffness: 100 }}
            style={{
              height: "500px",
              width: "100%",
              backgroundColor: "#F2C94C",
              borderRadius: "50px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.25)",
            }}
          >
            <motion.h1
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              First Div
            </motion.h1>
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              This is the first div. It has a yellow background, rounded corners,
              and a box shadow.
            </motion.p>
          </motion.div>
        )}
        {isSecondVisible && (
          <motion.div
            key="second"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5, ease: "easeInOut", stiffness: 100 }}
            style={{
              height: "500px",
              width: "100%",
              backgroundColor: "#219653",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.25)",
            }}
          >
            <motion.h1
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Second Div
            </motion.h1>
            <motion.p
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              This is the second div. It has a green background, sharp corners,
              and a box shadow.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
