FROM java:8

RUN mkdir /app
COPY urban-meme.jar /app/
COPY dependency /app/
COPY entrypoint.sh /app/
RUN chmod +x /app/entrypoint.sh

EXPOSE 9998

ENTRYPOINT [ "/app/entrypoint.sh" ]
