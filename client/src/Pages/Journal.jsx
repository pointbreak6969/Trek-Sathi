import { useState, useRef, useEffect } from "react";
import { journalData } from "../data/journalData";
import { motion, AnimatePresence } from "framer-motion";
import mountain from "../assets/mountain.jpg"; // Import the mountain image

const Journal = () => {
  const [entries, setEntries] = useState(journalData);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const fileInputRef = useRef(null);
  const [newEntry, setNewEntry] = useState({
    image: null,
    description: "",
  });

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewEntry({ ...newEntry, image: imageUrl });
      setIsCreating(true);
    }
  };

  const getCurrentLocation = () => {
    return new Promise((resolve) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve(
              `${position.coords.latitude}, ${position.coords.longitude}`
            );
          },
          () => {
            resolve("Location unavailable");
          }
        );
      } else {
        resolve("Location unavailable");
      }
    });
  };

  const createEntry = async () => {
    if (!newEntry.image || !newEntry.description) return;

    const location = await getCurrentLocation();
    const newJournalEntry = {
      id: Date.now(),
      image: newEntry.image,
      description: newEntry.description,
      location,
      timestamp: new Date().toISOString(),
    };

    setEntries([newJournalEntry, ...entries]);
    setIsCreating(false);
    setNewEntry({ image: null, description: "" });
  };

  const generatePoints = (numPoints) => {
    let points = [];
    const screenWidth = window.innerWidth / 2; // Use only the right half of the screen
    const screenHeight = window.innerHeight;

    let x = screenWidth * 0.1 + screenWidth; // Start at 10% of the right half
    let y = screenHeight * 0.1;

    for (let i = 0; i < numPoints; i++) {
      x += Math.random() * (screenWidth * 0.1) + screenWidth * 0.05;
      y += Math.random() * (screenHeight * 0.1) + screenHeight * 0.05;

      x = Math.min(x, screenWidth * 1.9); // Keep some padding (50px) on the right half
      y = Math.min(y, screenHeight - 50);

      points.push({ x, y });
    }

    return points;
  };

  const points = generatePoints(entries.length);

  const goToNextEntry = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % entries.length);
  };

  const goToPreviousEntry = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? entries.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    if (currentIndex !== null) {
      const timer = setTimeout(goToNextEntry, 5000);
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold">My Journal</h1>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center hover:bg-indigo-600 transition"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageSelect}
          />
        </div>
      </header>

      <main className="pt-20 pb-4 max-w-4xl mx-auto px-4 relative">
        <AnimatePresence>
          {isCreating && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white rounded-lg max-w-lg w-full m-4"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
              >
                <div className="p-4">
                  <img
                    src={newEntry.image}
                    alt="Selected"
                    className="w-full object-cover rounded"
                    style={{ objectFit: "cover" }}
                  />
                  <textarea
                    value={newEntry.description}
                    onChange={(e) =>
                      setNewEntry({ ...newEntry, description: e.target.value })
                    }
                    placeholder="How are you feeling about this moment?"
                    className="w-full mt-4 p-2 border rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows="3"
                  />
                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      onClick={() => setIsCreating(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={createEntry}
                      className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    >
                      Share
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100vh 100vw"
          style={{
            backgroundImage: `url(${mountain})`,
            backgroundSize: "200% 100%",
            backgroundPosition: "right center",
          }}
        >
          {points.map((point, index) => {
            if (index === 0) return null;
            const prevPoint = points[index - 1];
            return (
              <path
                key={index}
                d={`M${prevPoint.x},${prevPoint.y} Q${
                  (prevPoint.x + point.x) / 2
                },${prevPoint.y - 50} ${point.x},${point.y}`}
                stroke="black"
                fill="transparent"
              />
            );
          })}
        </svg>

        <div className="relative h-full mt-80">
          {entries.map((entry, index) => (
            <motion.div
              key={entry.id}
              className="absolute w-20 h-20 rounded-full bg-indigo-500 flex items-center justify-center cursor-pointer"
              onClick={() => setCurrentIndex(index)}
              initial={{ opacity: 0, scale: 0.1 }}
              animate={{ opacity: 1, scale: 0.8 }}
              transition={{ delay: index * 0.1 }}
              style={{
                top: `${points[index].y - 460}px`,
                left: `${points[index].x - 50}px`,
              }}
            >
              <img
                src={entry.image}
                alt={entry.description}
                className="w-full h-full object-cover rounded-full"
                style={{ objectFit: "cover" }}
              />
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {currentIndex !== null && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="relative bg-white rounded-lg max-w-screen-lg w-full h-full m-4 flex flex-col"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
              >
                <div className="flex-grow p-4 flex flex-col items-center justify-center">
                  <img
                    src={entries[currentIndex].image}
                    alt="Journal entry"
                    className="w-full object-cover rounded-lg"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="mt-4 w-full text-center">
                    <p className="text-sm text-gray-600">
                      {new Date(
                        entries[currentIndex].timestamp
                      ).toLocaleDateString()}{" "}
                      • {entries[currentIndex].location}
                    </p>
                    <p className="text-lg font-semibold mt-2">
                      {entries[currentIndex].description}
                    </p>
                  </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-between p-4">
                  <button
                    className="text-white bg-black/50 hover:bg-black/75 rounded-full p-4"
                    onClick={goToPreviousEntry}
                  >
                    <svg
                      className="w-screen h-80"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 4000 4000"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    className="text-white bg-black/50 hover:bg-black/75 rounded-full p-4"
                    onClick={goToNextEntry}
                  >
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 4000 4000"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>

                <button
                  className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2"
                  onClick={() => setCurrentIndex(null)}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 4000 4000"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Journal;
