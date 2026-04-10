{
  "project_name": "AI Music Learning Platform - Educational Redesign",
  "design_intent": "Transform the existing AI music interface (currently similar to Suno + Moises) into a structured, educational, human-AI interaction platform for students. Preserve the current generation workflow and aesthetic, but expand it into a multi-page system that teaches how AI works through interaction, feedback, and exploration.",
  
  "core_principles": [
    "Do not remove existing functionality; extend it",
    "Maintain current visual style and layout language where possible",
    "Reduce black-box feeling by increasing system transparency",
    "Design for learning, not just generation",
    "Support both beginner and advanced users through progressive disclosure",
    "Encourage experimentation, comparison, and reflection"
  ],

  "navigation": {
    "type": "top_navigation_bar",
    "items": [
      "Create",
      "Explore",
      "Student Models",
      "Analyze",
      "Projects"
    ],
    "note": "Keep navigation simple and consistent across all pages"
  },

  "pages": {

    "Create": {
      "description": "Enhance the current main generation interface without removing its core functionality",
      
      "layout": {
        "type": "three_panel",
        "panels": [
          "Left: Intent",
          "Center: Controls",
          "Right: Output + Explanation"
        ]
      },

      "features": {
        "left_panel": [
          "Prompt input (existing, keep)",
          "Style/genre selector",
          "Reference audio upload",
          "Preset ideas for students"
        ],

        "center_panel": [
          "Model selector dropdown",
          "Creativity slider (temperature)",
          "Structure/coherence slider",
          "Style influence control",
          "Advanced toggle to reveal deeper parameters"
        ],

        "right_panel": [
          "Generated audio player",
          "Waveform visualization",
          "Stem layers (if available)",
          "Explanation panel titled 'Why this output?'",
          "Short AI explanation of result based on prompt and parameters"
        ]
      },

      "educational_layer": [
        "Add small tooltips explaining each parameter",
        "Display model name and dataset info",
        "Show simple explanations of how inputs affect outputs"
      ]
    },

    "Explore": {
      "description": "New page focused on understanding how AI music systems work",

      "features": [
        "AI pipeline visualization (Dataset → Training → Model → Output)",
        "Interactive model comparison tool",
        "Dataset explorer showing genres and biases",
        "Short educational cards explaining concepts like diffusion, training, and bias"
      ],

      "ui_elements": [
        "Flow diagrams",
        "Side-by-side audio comparison player",
        "Charts or bars for dataset composition",
        "Hover tooltips for explanations"
      ],

      "goal": "Help students build mental models of how AI systems work"
    },

    "Student Models": {
      "description": "Gallery and interaction space for student-created models",

      "features": [
        "Grid of student model cards",
        "Each card includes name, description, and style",
        "Model detail page",
        "Try model with prompt input",
        "Compare with default model",
        "Remix or fork model functionality"
      ],

      "ui_elements": [
        "Card grid layout",
        "Model profile panel",
        "Comparison audio player",
        "Remix button"
      ],

      "goal": "Encourage ownership, creativity, and understanding of model design"
    },

    "Analyze": {
      "description": "Break down generated audio and expose AI decision-making",

      "features": [
        "Stem separation visualization",
        "Waveform with labeled sections",
        "AI confidence or highlight overlays",
        "Prompt-to-output mapping (which words influenced what)",
        "Audio feature visualization (rhythm, energy, structure)"
      ],

      "ui_elements": [
        "Layered waveform display",
        "Highlight regions on audio timeline",
        "Annotation markers",
        "Insight side panel"
      ],

      "goal": "Make invisible AI processes visible and understandable"
    },

    "Projects": {
      "description": "Save, organize, and reflect on student work",

      "features": [
        "Saved generations",
        "Version history",
        "Notes and reflections",
        "Project grouping",
        "Export/share functionality"
      ],

      "ui_elements": [
        "Project cards",
        "Timeline or history view",
        "Editable notes section"
      ],

      "educational_layer": [
        "Reflection prompts like 'What did you learn?' or 'What would you change?'"
      ],

      "goal": "Encourage iterative learning and reflection"
    }
  },

  "cross_platform_features": [
    "Tooltips explaining AI behavior",
    "Compare mode for outputs",
    "Transparency labels (model, dataset, parameters)",
    "Beginner vs Advanced toggle",
    "Consistent audio player across pages"
  ],

  "design_guidelines": {
    "preserve_existing": [
      "Keep current generation flow intact",
      "Retain visual aesthetic and layout style",
      "Do not remove current features, only expand"
    ],
    
    "additions": [
      "Introduce educational overlays instead of replacing UI",
      "Use progressive disclosure for advanced controls",
      "Keep interface clean and not overwhelming"
    ],

    "tone": "Creative, modern, and slightly experimental, similar to music production tools but more educational and transparent"
  }
}