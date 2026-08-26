export type ResultStyle = "normal" | "warning" | "danger";

export interface CheckerResult {
  message: string;
  style: ResultStyle;
}

export type SugarUnit = "mgdl" | "mmol";

export type SugarContext =
  | "fasting"
  | "before-meal"
  | "after-meal"
  | "random";

/**
 * Blood Pressure & Pulse Checker
 */
export function checkBloodPressure(
  systolic: number,
  diastolic: number,
  pulse: number
): CheckerResult {
  if (
    !Number.isFinite(systolic) ||
    !Number.isFinite(diastolic) ||
    !Number.isFinite(pulse)
  ) {
    return {
      message: "Please fill in all fields.",
      style: "warning",
    };
  }

  let message = "";
  let style: ResultStyle = "normal";

  if (systolic < 90 || diastolic < 60) {
    message =
      "Low blood pressure — This may be associated with dizziness, dehydration, or other conditions.";
    style = "warning";
  } else if (systolic <= 120 && diastolic <= 80) {
    message = "Normal blood pressure — Continue maintaining a healthy lifestyle.";
    style = "normal";
  } else if (
    (systolic >= 121 && systolic <= 139) ||
    (diastolic >= 81 && diastolic <= 89)
  ) {
    message =
      "Elevated blood pressure — Lifestyle improvements may be beneficial.";
    style = "warning";
  } else if (
    (systolic >= 140 && systolic <= 180) ||
    (diastolic >= 90 && diastolic <= 120)
  ) {
    message =
      "High blood pressure — This can increase cardiovascular risk. Consider professional evaluation and monitoring.";
    style = "danger";
  } else if (systolic > 180 || diastolic > 120) {
    message =
      "Very high blood pressure — Seek prompt medical attention, particularly if you have concerning symptoms.";
    style = "danger";
  } else {
    message = "Unable to classify this blood pressure reading.";
    style = "warning";
  }

  if (pulse < 60) {
    message +=
      "\nPulse: Low — A low resting pulse can be normal for some people but may require evaluation when accompanied by symptoms.";
  } else if (pulse <= 100) {
    message += "\nPulse: Within the commonly used adult resting range.";
  } else {
    message +=
      "\nPulse: High — Several factors can cause an elevated pulse, including stress, dehydration, illness, or exercise.";
  }

  return {
    message,
    style,
  };
}

/**
 * Blood Sugar Checker
 */
export function checkBloodSugar(
  value: number,
  unit: SugarUnit,
  context: SugarContext
): CheckerResult {
  if (!Number.isFinite(value) || value < 0) {
    return {
      message: "Please enter a valid blood sugar value.",
      style: "warning",
    };
  }

  // Convert mmol/L → mg/dL
  const sugar = unit === "mmol" ? value * 18 : value;

  /*
   * Very low glucose is concerning regardless of whether
   * the reading was fasting or after eating.
   */
  if (sugar < 54) {
    return {
      message:
        "Very low blood sugar. This can be dangerous and may require immediate medical attention.",
      style: "danger",
    };
  }

  if (sugar < 70) {
    return {
      message:
        "Low blood sugar. Symptoms can include sweating, shakiness, weakness, confusion, or dizziness.",
      style: "warning",
    };
  }

  /*
   * Fasting blood glucose
   *
   * Normal: <100 mg/dL
   * Prediabetes range: 100–125 mg/dL
   * Diabetes range: ≥126 mg/dL
   */
  if (context === "fasting") {
    if (sugar < 100) {
      return {
        message:
          "Normal fasting blood sugar range.",
        style: "normal",
      };
    }

    if (sugar < 126) {
      return {
        message:
          "Fasting blood sugar is in the prediabetes range. Consider discussing the result with a healthcare professional.",
        style: "warning",
      };
    }

    return {
      message:
        "Fasting blood sugar is in the diabetes range. A single reading does not establish a diagnosis; professional evaluation is recommended.",
      style: "danger",
    };
  }

  /*
   * Before-meal / pre-meal
   *
   * We avoid calling these values diagnostic because
   * interpretation depends on the person's circumstances.
   */
  if (context === "before-meal") {
    if (sugar < 70) {
      return {
        message:
          "Blood sugar is low. If you have symptoms or take glucose-lowering medication, seek appropriate medical advice.",
        style: "warning",
      };
    }

    if (sugar <= 130) {
      return {
        message:
          "This reading is within a commonly used target range for many people with diabetes before meals. Individual targets can differ.",
        style: "normal",
      };
    }

    return {
      message:
        "Blood sugar is above a commonly used pre-meal target for many people with diabetes. Individual targets differ, so discuss persistent high readings with your healthcare professional.",
      style: "warning",
    };
  }

  /*
   * Two hours after a meal
   */
  if (context === "after-meal") {
    if (sugar < 70) {
      return {
        message:
          "Blood sugar is low. If you have symptoms, take appropriate action and seek medical advice when necessary.",
        style: "warning",
      };
    }

    if (sugar < 140) {
      return {
        message:
          "This reading is below 140 mg/dL. For people without diabetes, this is generally considered a normal 2-hour post-meal level.",
        style: "normal",
      };
    }

    if (sugar < 200) {
      return {
        message:
          "This reading is elevated. A single post-meal reading cannot diagnose diabetes. Consider professional evaluation if elevated readings persist.",
        style: "warning",
      };
    }

    return {
      message:
        "This reading is significantly elevated. A single reading cannot establish a diagnosis, but persistent high readings should be evaluated by a healthcare professional.",
      style: "danger",
    };
  }

  /*
   * Random blood glucose
   */
  if (context === "random") {
    if (sugar < 140) {
      return {
        message:
          "This random blood sugar reading is below 140 mg/dL. Interpretation depends on when and what you last ate.",
        style: "normal",
      };
    }

    if (sugar < 200) {
      return {
        message:
          "This random blood sugar reading is elevated. Consider monitoring and discussing persistent abnormal readings with a healthcare professional.",
        style: "warning",
      };
    }

    return {
      message:
        "A random blood sugar of 200 mg/dL or higher can be concerning, particularly when accompanied by symptoms. Seek professional medical evaluation.",
      style: "danger",
    };
  }

  return {
    message: "Unable to interpret this reading.",
    style: "warning",
  };
}

/**
 * BMI Checker
 */
export type HeightUnit = "cm" | "m";

export function calculateBMI(
  weight: number,
  height: number,
  unit: HeightUnit
): CheckerResult {
  if (
    !Number.isFinite(weight) ||
    !Number.isFinite(height) ||
    weight <= 0 ||
    height <= 0
  ) {
    return {
      message: "Please enter a valid weight and height.",
      style: "warning",
    };
  }

  const heightInMeters = unit === "cm" ? height / 100 : height;

  const bmi = weight / (heightInMeters * heightInMeters);

  let message = "";
  let style: ResultStyle = "normal";

  if (bmi < 16) {
    message =
      "Severe underweight — This may be associated with nutritional and health risks. Consider professional assessment.";
    style = "danger";
  } else if (bmi < 18.5) {
    message =
      "Underweight — Consider nutrient-dense foods and discussing your weight with a healthcare professional.";
    style = "warning";
  } else if (bmi < 25) {
    message =
      "Normal BMI range — Maintain a balanced diet and regular physical activity.";
    style = "normal";
  } else if (bmi < 30) {
    message =
      "Overweight — Maintaining a healthy lifestyle may help reduce long-term health risks.";
    style = "warning";
  } else {
    message =
      "Obesity range — Consider discussing your overall health and weight with a healthcare professional.";
    style = "danger";
  }

  return {
    message: `BMI: ${bmi.toFixed(1)} — ${message}`,
    style,
  };
}