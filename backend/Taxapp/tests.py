from django.test import TestCase
import os
import openai
from dotenv import load_dotenv


class OpenAITestCase(TestCase):
    def test_openai_key_is_valid(self):
        """
        Test that the OpenAI API key is valid by making a simple request.
        """
        load_dotenv()
        OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
        openai.api_key = OPENAI_API_KEY
        
        # Ensure the key is set
        self.assertIsNotNone(openai.api_key, "OpenAI API key is not set.")

        try:
            # Send a simple request to OpenAI
            response = openai.chat.completions.create(  # Corrected method name
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": "Hello, OpenAI!"}
                ],
                max_tokens=5
            )
            
            # Assert that 'choices' are in the response
            self.assertGreater(len(response.choices), 0, "No choices were returned by the API.")
        except openai.error.OpenAIError:  # General OpenAI error
            self.fail("OpenAI API key is invalid or an API error occurred.")
        except Exception as e:
            self.fail(f"An unexpected error occurred: {str(e)}")

