# import streamlit as st
# import google.generativeai as genai
# from time import sleep

# # Set up the page configuration
# st.set_page_config(page_title="Master Chef Assistant", page_icon="👨‍🍳")

# # Initialize session state variables if they don't exist
# if "messages" not in st.session_state:
#     st.session_state.messages = []

# if "waiting_for_user" not in st.session_state:
#     st.session_state.waiting_for_user = False

# # Set up the Gemini API
# API_KEY = "AIzaSyDjlwZ6Lw0OoFu7SeU_eccwmlZbUuEfq-s"
# genai.configure(api_key=API_KEY)

# # Master chef prompt
# MASTER_CHEF_PROMPT = """You are a master-chef, who is going to help users cook their own meals based on the ingredients available to them. 
# You will understand the user's mood and suggest meals accordingly or politely ask them to order whatever additional ingredients they need. 
# When starting to tell the recipe, ask the user if they need time, or want to go step by step."""

# # Function to get response from Gemini
# def get_gemini_response(conversation_history):
#     try:
#         # Updated to get available models first
#         models = genai.list_models()
#         gemini_models = [m.name for m in models if "gemini" in m.name.lower()]
        
#         # Use the first available Gemini model or fallback to a known model name format
#         if gemini_models:
#             model_name = gemini_models[0]
#             st.sidebar.info(f"Using model: {model_name}")
#         else:
#             # Try the full model path format
#             model_name = "models/gemini-1.0-pro"
#             st.sidebar.warning(f"No Gemini models found, trying: {model_name}")
        
#         model = genai.GenerativeModel(model_name)
        
#         # Create a chat session
#         chat = model.start_chat(history=[])
        
#         # Add the system prompt
#         system_prompt = [{"role": "system", "content": MASTER_CHEF_PROMPT}]
        
#         # Format messages for the chat
#         messages = []
#         for msg in conversation_history:
#             if msg["role"] == "user":
#                 messages.append({"role": "user", "content": msg["content"]})
#             else:
#                 messages.append({"role": "model", "content": msg["content"]})
        
#         # Get response from the chat
#         response = chat.send_message(messages[-1]["content"] if messages else "Hello")
#         return response.text
#     except Exception as e:
#         st.sidebar.error(f"API Error: {str(e)}")
#         # Fallback response
#         return "I'm having trouble connecting to my cooking knowledge. Please try again or check if the API key is valid."

# # App title and description
# st.title("👨‍🍳 Master Chef Assistant")
# st.sidebar.title("About")
# st.sidebar.info("This is a Master Chef Assistant powered by Google's Gemini AI.")
# st.markdown("Share your available ingredients and mood, and I'll help you cook a delicious meal!")

# # Display chat messages
# for message in st.session_state.messages:
#     with st.chat_message(message["role"]):
#         st.write(message["content"])

# # Initial greeting if no messages yet
# if not st.session_state.messages:
#     with st.chat_message("assistant"):
#         st.write("👋 Hello! I'm your Master Chef Assistant. What ingredients do you have available today, and how are you feeling? I'll suggest some delicious meals tailored to your mood and pantry!")
    
#     # Add the greeting to the message history
#     st.session_state.messages.append({"role": "assistant", "content": "👋 Hello! I'm your Master Chef Assistant. What ingredients do you have available today, and how are you feeling? I'll suggest some delicious meals tailored to your mood and pantry!"})

# # Handle user input
# if prompt := st.chat_input("Tell me about your ingredients and mood..."):
#     # Add user message to chat
#     st.session_state.messages.append({"role": "user", "content": prompt})
#     with st.chat_message("user"):
#         st.write(prompt)
    
#     # Get and display assistant response
#     with st.chat_message("assistant"):
#         message_placeholder = st.empty()
        
#         # If we're waiting for user confirmation on steps
#         if st.session_state.waiting_for_user:
#             if any(keyword in prompt.lower() for keyword in ["step by step", "next", "continue", "go on", "proceed"]):
#                 st.session_state.waiting_for_user = False
#             else:
#                 response = "Would you like me to proceed with the recipe step by step? Just let me know when you're ready for the next step."
#                 message_placeholder.write(response)
#                 st.session_state.messages.append({"role": "assistant", "content": response})
#                 st.stop()
        
#         # Get regular response from Gemini
#         with st.spinner("Cooking up a response..."):
#             full_response = get_gemini_response(st.session_state.messages)
        
#         # Check if the message includes asking about step-by-step instructions
#         if any(phrase in full_response.lower() for phrase in ["step by step", "would you like me to wait", "need time", "go through each step"]):
#             st.session_state.waiting_for_user = True
        
#         # Display the response with a typing effect
#         response = ""
#         for chunk in full_response.split():
#             response += chunk + " "
#             message_placeholder.write(response)
#             sleep(0.01)  # Adjust for typing speed
            
#         st.session_state.messages.append({"role": "assistant", "content": full_response})

# # Add a reset button
# if st.button("Start New Conversation"):
#     st.session_state.messages = []
#     st.session_state.waiting_for_user = False
#     st.rerun()

# # Add some styling
# st.markdown("""
# <style>
#     .stChatMessage {
#         padding: 1rem;
#         border-radius: 0.5rem;
#         margin-bottom: 1rem;
#     }
# </style>
# """, unsafe_allow_html=True)
import streamlit as st
import google.generativeai as genai
from time import sleep

# Set up the page configuration
st.set_page_config(page_title="Master Chef Assistant", page_icon="👨‍🍳")

# Initialize session state variables if they don't exist
if "messages" not in st.session_state:
    st.session_state.messages = []

if "waiting_for_user" not in st.session_state:
    st.session_state.waiting_for_user = False

# Set up the Gemini API
API_KEY = "AIzaSyDjlwZ6Lw0OoFu7SeU_eccwmlZbUuEfq-s"
genai.configure(api_key=API_KEY)

# Master chef prompt
MASTER_CHEF_PROMPT = """You are a master-chef, who is going to help users cook their own meals based on the ingredients available to them. 
You will understand the user's mood and suggest meals accordingly or politely ask them to order whatever additional ingredients they need. 
When starting to tell the recipe, ask the user if they need time, or want to go step by step."""

# Function to get response from Gemini
def get_gemini_response(conversation_history):
    try:
        # Use the new recommended model
        model = genai.GenerativeModel("gemini-1.5-flash")
        
        # Format the conversation for Gemini
        chat = model.start_chat(history=[])
        
        # Add the system prompt first
        chat.send_message(MASTER_CHEF_PROMPT)
        
        # Add the conversation history
        for msg in conversation_history:
            if msg["role"] == "user":
                chat.send_message(msg["content"])
            
        # Get the last user message or use a default
        last_user_message = next((msg["content"] for msg in reversed(conversation_history) 
                                if msg["role"] == "user"), "Hello")
        
        # Generate response for the last message
        response = chat.send_message(last_user_message)
        return response.text
    except Exception as e:
        st.sidebar.error(f"API Error: {str(e)}")
        # Fallback response
        return f"I'm having trouble connecting to my cooking knowledge. Error: {str(e)}"

# App title and description
st.title("👨‍🍳 Master Chef Assistant")
st.sidebar.title("About")
st.sidebar.info("This is a Master Chef Assistant powered by Google's Gemini AI.")
st.markdown("Share your available ingredients and mood, and I'll help you cook a delicious meal!")

# Display chat messages
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.write(message["content"])

# Initial greeting if no messages yet
if not st.session_state.messages:
    with st.chat_message("assistant"):
        st.write("👋 Hello! I'm your Master Chef Assistant. What ingredients do you have available today, and how are you feeling? I'll suggest some delicious meals tailored to your mood and pantry!")
    
    # Add the greeting to the message history
    st.session_state.messages.append({"role": "assistant", "content": "👋 Hello! I'm your Master Chef Assistant. What ingredients do you have available today, and how are you feeling? I'll suggest some delicious meals tailored to your mood and pantry!"})

# Handle user input
if prompt := st.chat_input("Tell me about your ingredients and mood..."):
    # Add user message to chat
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.write(prompt)
    
    # Get and display assistant response
    with st.chat_message("assistant"):
        message_placeholder = st.empty()
        
        # If we're waiting for user confirmation on steps
        if st.session_state.waiting_for_user:
            if any(keyword in prompt.lower() for keyword in ["step by step", "next", "continue", "go on", "proceed"]):
                st.session_state.waiting_for_user = False
            else:
                response = "Would you like me to proceed with the recipe step by step? Just let me know when you're ready for the next step."
                message_placeholder.write(response)
                st.session_state.messages.append({"role": "assistant", "content": response})
                st.stop()
        
        # Get regular response from Gemini
        with st.spinner("Cooking up a response..."):
            full_response = get_gemini_response(st.session_state.messages)
        
        # Check if the message includes asking about step-by-step instructions
        if any(phrase in full_response.lower() for phrase in ["step by step", "would you like me to wait", "need time", "go through each step"]):
            st.session_state.waiting_for_user = True
        
        # Display the response with a typing effect
        response = ""
        for chunk in full_response.split():
            response += chunk + " "
            message_placeholder.write(response)
            sleep(0.01)  # Adjust for typing speed
            
        st.session_state.messages.append({"role": "assistant", "content": full_response})

# Add a reset button
if st.button("Start New Conversation"):
    st.session_state.messages = []
    st.session_state.waiting_for_user = False
    st.rerun()

# Add some styling
st.markdown("""
<style>
    .stChatMessage {
        padding: 1rem;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
    }
</style>
""", unsafe_allow_html=True)