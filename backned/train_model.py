import pandas as pd
import string
import nltk
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import matplotlib.pyplot as plt
import seaborn as sns
from wordcloud import WordCloud
import joblib

# ===== Download NLTK resources (only first time) =====
nltk.download("punkt")
nltk.download("stopwords")

from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer

# ===== Load Dataset =====
fake = pd.read_csv(r"C:\Users\gsiva\Downloads\fake\Fake.csv")
true = pd.read_csv(r"C:\Users\gsiva\Downloads\fake\True.csv")

fake["label"] = "fake"
true["label"] = "real"

data = pd.concat([fake[["text", "label"]], true[["text", "label"]]], axis=0)
data = data.sample(frac=1, random_state=42).reset_index(drop=True)

print("Dataset shape:", data.shape)

# ===== Preprocessing =====
stop_words = set(stopwords.words("english"))
stemmer = PorterStemmer()

def preprocess(text):
    if pd.isnull(text):
        return ""
    text = text.lower()
    text = text.translate(str.maketrans("", "", string.punctuation + string.digits))
    tokens = nltk.word_tokenize(text)
    tokens = [stemmer.stem(word) for word in tokens if word not in stop_words]
    return " ".join(tokens)

data["clean_text"] = data["text"].apply(preprocess)

# ===== Train-Test Split =====
X = data["clean_text"]
y = data["label"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# ===== Vectorization =====
vectorizer = TfidfVectorizer(max_features=5000)
X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)

# ===== Train Model =====
model = MultinomialNB()
model.fit(X_train_vec, y_train)

# ===== Evaluation =====
y_pred = model.predict(X_test_vec)
print("\nModel Performance:")
print("Accuracy:", accuracy_score(y_test, y_pred))
print("\nClassification Report:\n", classification_report(y_test, y_pred))

# ===== Visualization: Confusion Matrix =====
cm = confusion_matrix(y_test, y_pred, labels=["fake", "real"])
plt.figure(figsize=(6, 5))
sns.heatmap(cm, annot=True, fmt="d", cmap="Blues", xticklabels=["Fake", "Real"], yticklabels=["Fake", "Real"])
plt.title("Confusion Matrix")
plt.ylabel("True Label")
plt.xlabel("Predicted Label")
plt.show()

# ===== Save Model and Vectorizer =====
joblib.dump(model, "fake_news_model.pkl")
joblib.dump(vectorizer, "tfidf_vectorizer.pkl")

print("\n✅ Model and Vectorizer saved successfully!")
