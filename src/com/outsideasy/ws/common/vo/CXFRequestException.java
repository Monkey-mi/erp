package com.outsideasy.ws.common.vo;

public class CXFRequestException extends java.lang.RuntimeException{

	/**
	 * 
	 */
	private static final long serialVersionUID = -2468524095714018707L;
	protected final String message;
    
    public CXFRequestException(String msg) {
        message = msg;
    }

	public String getMessage() {
		return message;
	}
    
}
