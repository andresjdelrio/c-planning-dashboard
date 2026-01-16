import uvicorn
from api.app import app
from api.routes import initiatives
import os
from dotenv import load_dotenv

load_dotenv()

app.include_router(initiatives.router)

if __name__ == "__main__":
    port = int(os.getenv("API_PORT", 3001))
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=port,
        reload=True
    )
