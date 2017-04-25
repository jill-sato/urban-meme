#!/bin/bash -ex
# Pass system properties with -D from environment vars
# e.g., -Dfoo=$FOO
# The $FOO environment variable will come from the docker run command with -e FOO=xxx
java -jar /app/urban-meme.jar
