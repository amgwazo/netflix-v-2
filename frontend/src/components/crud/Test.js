import React, { useState, useEffect } from "react";

const YourComponent = () => {
  const [testInitialValues, setTestInitialValues] = useState(null);

  useEffect(() => {
    
        const fetchInitialValues = async () => {
          try {
            const response = await fetch("Test.json");

            // Check the response status
            if (!response.ok) {
              const errorText = await response.text();
              throw new Error(
                `Failed to fetch: ${response.status} ${response.statusText}. Response: ${errorText}`
              );
            }

            const data = await response.json();
            console.log("Fetched initialValues:", data);
            setTestInitialValues(data);
          } catch (error) {
            console.error("Error fetching initial values:", error);
          }
        };


    fetchInitialValues();
  }, []); // The empty dependency array ensures the effect runs once on mount

  console.log("Current test initialValues state:", testInitialValues);

  // Render your component based on initialValues
  return (
    <div>
      {testInitialValues ? (
        // Render your component with the fetched initialValues
        <p>{JSON.stringify(testInitialValues)}</p>
      ) : (
        // Render a loading state or handle the absence of initialValues
        <p>Loading...</p>
      )}
    </div>
  );
};

export default YourComponent;
