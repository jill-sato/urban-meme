package org.github.urban.meme.beans;

import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author rgrecour
 */
@XmlRootElement
public class Message {
    private String msg;

    public Message() {
    }

    public Message(String msg) {
        this.msg = msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public String getMsg() {
        return msg;
    }
}
