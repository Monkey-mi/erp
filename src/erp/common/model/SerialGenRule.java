package erp.common.model;

import java.io.Serializable;
import java.util.Date;

import erp.common.Model;


public class SerialGenRule extends Model implements Serializable {
    private int         sr_id;
    private String          code;
    private String          name;
    private int         len;
    private String          status_flg;
    private Date            create_dt;
    private String          creator;

    public int getSr_id() {
        return sr_id;
    }
    public void setSr_id(int sr_id) {
        this.sr_id = sr_id;
    }
    public String getCode() {
        return code;
    }
    public void setCode(String code) {
        this.code = code;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public int getLen() {
        return len;
    }
    public void setLen(int len) {
        this.len = len;
    }
    public String getStatus_flg() {
        return status_flg;
    }
    public void setStatus_flg(String status_flg) {
        this.status_flg = status_flg;
    }
    public Date getCreate_dt() {
        return create_dt;
    }
    public void setCreate_dt(Date create_dt) {
        this.create_dt = create_dt;
    }
    public String getCreator() {
        return creator;
    }
    public void setCreator(String creator) {
        this.creator = creator;
    }
}
