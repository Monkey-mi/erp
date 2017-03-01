package srm.supplier.data;

import java.util.List;
import java.util.Map;

import srm.supplier.model.BankAccount;


public interface BankAccountMapper {

	public List<BankAccount> getBankAccountList(Map<String,Object> params);
	public void addBankAccount(BankAccount obj);
	public void updateBankAccount(BankAccount obj);
	public void deleteBankAccount(BankAccount obj);
}
