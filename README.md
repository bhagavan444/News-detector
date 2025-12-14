# Fake News Detector Web Application

## Overview
The Fake News Detector Web Application is a machine learning–based system designed to identify whether a given news article is real or fake. The application uses Natural Language Processing (NLP) techniques and supervised learning models to analyze news content and provide accurate classification results through a web-based interface.

## Problem Statement
The rapid spread of fake news on digital platforms can mislead users and cause misinformation. Manual verification of news is time-consuming and inefficient. This project aims to automatically detect fake news using machine learning and NLP techniques, helping users verify information quickly and reliably.

## Key Features
- Fake news detection using machine learning
- Text preprocessing and NLP-based analysis
- Real-time prediction through a web interface
- REST API integration between backend and frontend
- Responsive and user-friendly UI
- Fast inference with optimized models

## Tech Stack

### Frontend
- React.js
- HTML5
- CSS3
- JavaScript

### Backend
- Python
- Flask
- REST APIs

### Machine Learning & NLP
- Scikit-learn
- TF-IDF Vectorizer
- Logistic Regression / Naive Bayes
- Pandas
- NumPy

### Tools & Platforms
- Git & GitHub
- VS Code
- Postman

## System Architecture
1. User enters or pastes news text into the web interface.
2. Frontend sends the input data to the Flask backend API.
3. Backend preprocesses the text (cleaning, tokenization, vectorization).
4. Machine learning model classifies the news as Real or Fake.
5. Prediction result is sent back and displayed on the UI.

## Machine Learning Workflow
- Data collection and preprocessing
- Text cleaning and normalization
- Feature extraction using TF-IDF
- Model training and evaluation
- Model deployment using Flask
- Real-time inference via REST API

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/fake-news-detector.git
Navigate to the project directory:

cd fake-news-detector


Install backend dependencies:

pip install -r requirements.txt


Install frontend dependencies:

npm install

Run

Start the backend server:

python app.py


Start the frontend application:

npm start


Open the application in your browser using the local URL provided.

Future Enhancements

Integration of transformer-based NLP models (BERT, RoBERTa)

Real-time news scraping and automated verification

Multi-language fake news detection

Confidence score visualization for predictions

Browser extension integration

Learning Outcomes

Gained practical experience in NLP and text classification

Implemented machine learning models for real-world problems

Built REST APIs using Flask

Integrated ML backend with React frontend

Understood full-stack deployment of ML applications

Author

Siva Satya Sai Bhagavan Gopalajosyula
B.Tech – Artificial Intelligence & Data Science
GitHub: https://github.com/bhagavan444
