package org.github.urban.meme;

import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ws.rs.ProcessingException;
import javax.ws.rs.ext.RuntimeDelegate;
import org.glassfish.jersey.grizzly2.httpserver.GrizzlyHttpContainer;
import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.grizzly.http.server.CLStaticHttpHandler;
import org.glassfish.grizzly.http.server.HttpServer;
import org.glassfish.grizzly.http.server.NetworkListener;
import org.glassfish.grizzly.http.server.ServerConfiguration;
import org.glassfish.jersey.moxy.json.MoxyJsonConfig;

public class Main {

    public static final String WEB_ROOT = "/webroot/";
    public static final String APP_PATH = "/urban-meme/";
    public static final int PORT = 9998;

    public static HttpServer startServer(String webRootPath) {
        final HttpServer server = new HttpServer();
        Runtime.getRuntime().addShutdownHook(new Thread(new Runnable() {
            @Override
            public void run() {
                server.shutdownNow();
            }
        }));
        final NetworkListener listener = new NetworkListener("grizzly", "0.0.0.0", PORT);
        server.addListener(listener);

        final ServerConfiguration config = server.getServerConfiguration();

        // add handler for static files
        config.addHttpHandler(
                new CLStaticHttpHandler(
                        Main.class.getClassLoader(), WEB_ROOT),
                        APP_PATH);

        // add handler for serving JAX-RS resources
        config.addHttpHandler(RuntimeDelegate.getInstance().createEndpoint(
                createResourceConfig(),
                GrizzlyHttpContainer.class),
                "/urban-meme-api");

        try {
            server.start();
        } catch (Exception ex) {
            throw new ProcessingException("Exception thrown when trying to start grizzly server", ex);
        }

        return server;
    }

    public static void main(String[] args) {

        try {
            final HttpServer server = startServer(args.length >= 1 ? args[0] : null);
            System.out.println(String.format("Application started.\n"
                            + "Access it at %s\n"
                            + "Stop the application using CTRL+C",
                    getAppUri()));

            Thread.currentThread().join();
        } catch (InterruptedException ex) {
            Logger.getLogger(Main.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public static String getAppUri() {
        return String.format("http://localhost:%s%s", PORT, APP_PATH);
    }

    public static MoxyJsonConfig createMoxyConfig(){
        MoxyJsonConfig moxyJsonConfig = new MoxyJsonConfig();
        Map<String, String> namespacePrefixMapper = new HashMap<>(1);
        namespacePrefixMapper.put("http://www.w3.org/2001/XMLSchema-instance", "xsi");
        moxyJsonConfig.setNamespacePrefixMapper(namespacePrefixMapper).setNamespaceSeparator(':');
        return moxyJsonConfig;
    }

    public static ResourceConfig createResourceConfig() {
        return new ResourceConfig().registerClasses(Resource.class)
                .register(createMoxyConfig().resolver());
    }
}
