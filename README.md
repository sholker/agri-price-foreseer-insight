## Project info

**A Machine Learning Approach to Forecast the Agricultural Food Production Index**
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This project presents an interactive web application to visualize and explore the results of advanced research aimed at predicting agricultural food production trends. It utilizes various data analysis techniques and machine learning models to provide insights into global food security and agricultural economics.

**Authors:** Ori Shai, Daniel Roei, Neta Tevet  
**Supervisor:** Dr. Abraham Yosipof  
*A final project for the Academic Center for Law and Business.*
---


## 🌐 Live Demo
[**Explore the live dashboard here!**](https://your-live-demo-url.com)  *(<-- Replace with your actual deployment URL)*

---

## ✨ Key Features

-   **Interactive Dashboard:** Explore research findings through a dynamic and user-friendly interface built with React and Vite.
-   **Advanced Model Comparison:** Compare the performance and forecasts of three different machine learning models: ARIMA, TabPFN, and a custom Stacking (Blended) model.
-   **Rich Data Visualization:**
    -   **Food Production Index:** Track historical and forecasted food production indices for over 180 countries.
    -   **Correlation Matrix:** Understand the relationships between 7 key variables, including pesticide use, carbon emissions, and population data.
    -   **3D PCA & K-Means Clustering:** Visualize country clusters and influential components in a 3D space using Plotly.js.
-   **Interactive Methodology Explorer:** A dynamic flow diagram built with React Flow, detailing every step of the research process from data collection to model validation.

---

## 🔬 Research Methodology
Our research follows a comprehensive, multi-stage process:

1.  **Data Collection & Preprocessing:** Aggregating data from sources like the FAO and World Bank, followed by normalization, cleaning, and imputation of missing values using a Random Forest model.
2.  **Exploratory Data Analysis (EDA):** Utilizing PCA for dimensionality reduction and K-Means for clustering to uncover hidden patterns and relationships in the data.
3.  **Predictive Modeling:** Developing and training three distinct models (ARIMA, TabPFN, and a Blended Stacking model) to forecast the Food Production Index.
4.  **Validation & Analysis:** Rigorously evaluating model performance using RMSE and comparing their predictive power.


The entire methodology is visualized in our **interactive flow diagram** within the application, allowing for a deep dive into each specific step.


---

## 🚀 Technology Stack

-   **Frontend:** [React](https://reactjs.org/), [Vite](https://vitejs.dev/), [TypeScript](https://www.typescriptlang.org/)
-   **UI Framework:** [shadcn-ui](https://ui.shadcn.com/) & [Tailwind CSS](https://tailwindcss.com/)
-   **Data Visualization:**
    -   [Recharts](https://recharts.org/) for 2D line charts.
    -   [Plotly.js](https://plotly.com/javascript/) for 3D PCA and K-Means charts.
    -   [React Flow](https://reactflow.dev/) for the interactive methodology mindmap.
-   **Data Fetching & State:** [TanStack Query](https://tanstack.com/query/latest) & React Context API.

---

## 📂 Project Structure
A brief overview of the key directories:

```
/
├── public/              # Static assets and data files (CSVs, images)
├── src/
│   ├── components/      # Reusable React components
│   │   ├── ui/          # UI components from shadcn-ui
│   │   └── ...          # Feature-specific components (charts, cards, etc.)
│   ├── contexts/        # React context providers (e.g., AuthContext)
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   └── App.tsx          # Main application component
└── ...                  # Configuration files (vite, tailwind, etc.)
```

---

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements or find any issues, please feel free to open an issue or submit a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📜 License

This project is distributed under the MIT License. See `LICENSE.txt` for more information.

---

## 🙏 Acknowledgments

-   Ori Shai
-   Daniel Roei
-   Neta Tevet
-   Dr. Abraham Yosipof (Supervisor)
-   The Academic Center for Law and Business
