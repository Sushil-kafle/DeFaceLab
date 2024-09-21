from fastapi import FastAPI
import uvicorn

from routers import authentication
from config.db import init_db


from routers import user as user_router
from routers import fileuploader


PORT = 8000


app = FastAPI()


@app.on_event("startup")
async def on_startup():
    await init_db()


app.include_router(
    user_router.router,
)
app.include_router(
    authentication.router,
)
app.include_router(
    fileuploader.router,
)


if __name__ == "__main__":
    config = uvicorn.Config("main:app", port=PORT, reload=True)
    server = uvicorn.Server(config)
    server.run()
