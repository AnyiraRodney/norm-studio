# ==============================================================================
# AI for Software Engineering - Assignment Code
# File: model_simulation.py
# Case Study: Hospital Readmission Prediction
# ==============================================================================
from sklearn.metrics import confusion_matrix, precision_score, recall_score

# --- Hypothetical Data (Ground Truth vs Model Prediction) ---
# 0 = No Readmission, 1 = Readmission
y_true = [0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1]
y_pred = [0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1]

def evaluate_model():
    print("--- Hospital Readmission Model Evaluation ---")
    
    # 1. Confusion Matrix
    cm = confusion_matrix(y_true, y_pred)
    tn, fp, fn, tp = cm.ravel()
    print(f"\n1. Confusion Matrix:\n{cm}")
    print(f"   TN: {tn} | FP: {fp} | FN: {fn} | TP: {tp}")

    # 2. Precision (Accuracy of 'High Risk' flags)
    precision = precision_score(y_true, y_pred)
    print(f"\n2. Precision: {precision:.4f}")

    # 3. Recall (Ability to find all High Risk patients)
    recall = recall_score(y_true, y_pred)
    print(f"\n3. Recall: {recall:.4f}")

if __name__ == "__main__":
    evaluate_model()