import os
import openai 
from dotenv import load_dotenv

load_dotenv()
OPENAI_API_KEY=os.getenv("OPENAI_API_KEY")  # import key
openai.api_key = OPENAI_API_KEY

def generate_tips(tax, income, expenses):    # Call the OpenAI API to generate the tips
    response = aicall(tax, income , expenses)
    return format_response(response)

def aicall(tax, income, expenses):                                      # Construct the system prompt,instructions to the model for the answer
    system_prompt = f"""You are an expert tax advisor in Greece.
    You client sents you the following message: "My tax owed is €{tax:.2f}.
    My Annual Income is {income} and my annual expenses are {expenses}.
    Can you give me tips for optimizing taxes and saving money?"
    Analyse the inputs in a short paragraph, then in an organized way,
    give 4-5 advice your client (create the text like you talk to him), guide him 
    as a profesional (talk with numbers and make him understand) and if his income 
    and tax is very high, make suggestions for 3-4 "safe" investments. (Keep in mind
    that you are a profesional and you know the market). Organize your text, 
    follow a casual yet formal structure (dont use #, * or bullets) and be clear in your advice"""
   
    response = openai.chat.completions.create(     # Make the API call
        model="gpt-4o-mini",
        messages=[{
            "role": "user",
            "content": system_prompt
        }],
        temperature=0.8,                  #defines the differentiallity in the answers 
        max_tokens=650                    # a token = 0.75 words so we set the limit of words used
    )

    return response

def format_response(response):
    tips = response.choices[0].message.content  # Extract the generated tips from the response
    tips = tips.strip()                         # Remove any unwanted text or formatting
    return tips    