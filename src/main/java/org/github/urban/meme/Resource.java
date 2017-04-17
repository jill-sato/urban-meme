package org.github.urban.meme;

import org.github.urban.meme.beans.Message;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/")
public class Resource {

    @GET
    @Path("/sayHello")
    @Produces(MediaType.APPLICATION_JSON)
    public Message sayHello() {
        return new Message("Hello!");
    }
}
