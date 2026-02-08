
import { GoogleGenAI, Type } from "@google/genai";

// const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const INNOVATION_SCHEMA = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING },
      description: { type: Type.STRING },
      scores: {
        type: Type.OBJECT,
        properties: {
          contextMatch: { type: Type.NUMBER },
          evidenceStrength: { type: Type.NUMBER },
          adoptionHistory: { type: Type.NUMBER },
          grassrootsSuitability: { type: Type.NUMBER },
          costAccessibility: { type: Type.NUMBER },
          policyReadiness: { type: Type.NUMBER },
        },
        required: ["contextMatch", "evidenceStrength", "adoptionHistory", "grassrootsSuitability", "costAccessibility", "policyReadiness"]
      },
      acs: { type: Type.NUMBER },
      confidenceLevel: { type: Type.STRING },
      reasons: { type: Type.ARRAY, items: { type: Type.STRING } },
      dataGaps: { type: Type.ARRAY, items: { type: Type.STRING } },
      nextAction: { type: Type.STRING },
      beneficiaries: { type: Type.ARRAY, items: { type: Type.STRING } },
      faoUseCase: {
        type: Type.OBJECT,
        properties: {
          preconditions: { type: Type.ARRAY, items: { type: Type.STRING } },
          basicFlow: { type: Type.ARRAY, items: { type: Type.STRING } },
          alternativeFlows: { type: Type.ARRAY, items: { type: Type.STRING } },
          successScenario: { type: Type.STRING },
          failureScenario: { type: Type.STRING },
        },
        required: ["preconditions", "basicFlow", "alternativeFlows", "successScenario", "failureScenario"]
      }
    },
    required: ["title", "description", "scores", "acs", "confidenceLevel", "reasons", "dataGaps", "nextAction", "beneficiaries", "faoUseCase"]
  }
};

export async function generateRecommendations(data) {
  const prompt = `
    As an AI Decision Intelligence Engine for Agrifood Systems, recommend exactly 2-3 specific innovations for the following context:
    - User Persona: ${data.persona}
    - Geography: ${data.country}, ${data.region}
    - Problem Area: ${data.problemArea}
    - Budget: ${data.budget}
    - Literacy: ${data.literacy}
    - Connectivity: ${data.connectivity}
    - Gender Focus: ${data.genderFocus ? "Yes" : "No"}
    - Decision Goal: ${data.goal}

    Evaluation Criteria (Scores 0-100):
    1. Context Match: Suitability for ${data.region} geography.
    2. Evidence Strength: Availability of documented outcomes.
    3. Adoption History: Previous adoption success.
    4. Grassroots Suitability: Feasibility for smallholders.
    5. Cost & Accessibility: Affordability.
    6. Policy Readiness: Alignment with local regulations.

    Persona-based Weighting:
    - Adjust the ACS (Adoption Confidence Score) based on ${data.persona}'s likely priorities.
    - Classify confidenceLevel as: "High" (Deploy/Scale), "Medium" (Pilot), or "Low" (Needs Policy Support).

    Output must include a structured FAO ATIO Use Case (Appendix 1 Alignment).
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: INNOVATION_SCHEMA,
      },
    });

    const results = JSON.parse(response.text || "[]");
    return results;
  } catch (error) {
    console.error("Error generating recommendations:", error);
    throw error;
  }
}
