package erp.common;

import javax.activation.DataHandler;
import javax.xml.bind.annotation.XmlAccessType;  
import javax.xml.bind.annotation.XmlAccessorType; 
import javax.xml.bind.annotation.XmlMimeType;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement  
@XmlAccessorType(XmlAccessType.FIELD) 
public class FileContainer {
	@XmlMimeType("application/octet-stream")  
    private DataHandler fileData;
	private String column_1;
	public String getColumn_1() {
		return column_1;
	}

	public void setColumn_1(String column_1) {
		this.column_1 = column_1;
	}

	public DataHandler getFileData() {
		return fileData;
	}

	public void setFileData(DataHandler fileData) {
		this.fileData = fileData;
	}

	public FileContainer() {
		super();
	}

	public FileContainer(DataHandler fileData) {
		super();
		this.fileData = fileData;
	} 
	
}
