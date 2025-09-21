// js/mobile/components/CheckoutModal.js

const { React } = window;
const { useState, useEffect } = React;

// ✅ CORREÇÃO: O caminho para apiService.js agora é absoluto
import { authenticatedFetch } from '/js/mobile/services/apiService.js';

const CheckoutModal = ({ isOpen, onClose, onSave, comanda, total, user, showNotification }) => {
    if (!isOpen) return null;

    const [payments, setPayments] = useState([]);
    const [currentMethod, setCurrentMethod] = useState('dinheiro');
    const [currentValue, setCurrentValue] = useState('');
    const [amountReceived, setAmountReceived] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const totalPaid = payments.reduce((acc, p) => acc + p.value, 0);
    const remainingAmount = total - totalPaid;
    const change = (currentMethod === 'dinheiro' && amountReceived && remainingAmount > 0) ? parseFloat(amountReceived) - remainingAmount : 0;

    const handleAddPayment = () => {
        const value = parseFloat(currentValue);
        if (!value || value <= 0 || value > remainingAmount + 0.001) {
            showNotification('Valor Inválido', 'Por favor, insira um valor de pagamento válido.');
            return;
        }
        setPayments([...payments, { method: currentMethod, value }]);
        setCurrentValue('');
    };

    const handleRemovePayment = (index) => {
        setPayments(payments.filter((_, i) => i !== index));
    };

    const handleFinalizeCheckout = async () => {
        setIsSaving(true);
        try {
            const paymentData = {
                payments,
                totalAmount: total,
                items: [...(comanda.services || []), ...(comanda.comandaItems || [])],
            };
            await authenticatedFetch(`/api/appointments/${comanda.id}/checkout`, { method: 'POST', body: JSON.stringify(paymentData) }, user);
            showNotification('Sucesso!', 'Pagamento finalizado com sucesso.');
            onSave();
            onClose();
        } catch (error) {
            showNotification("Erro", `Não foi possível finalizar o pagamento: ${error.message}`);
        } finally {
            setIsSaving(false);
        }
    };

    useEffect(() => {
        setCurrentValue(remainingAmount > 0 ? remainingAmount.toFixed(2) : '');
    }, [remainingAmount]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-sm m-4 flex flex-col" style={{maxHeight: '90vh'}}>
                <div className="p-4 border-b"><h3 className="text-xl font-bold text-gray-800">Finalizar Pagamento</h3></div>
                <div className="p-4 flex-1 overflow-y-auto">
                    <div className="text-center mb-4">
                        <p className="text-lg text-gray-600">Valor Total</p>
                        <p className="text-5xl font-bold text-gray-800 my-2">R$ {total.toFixed(2)}</p>
                    </div>
                    <div className="border-t pt-4">
                        <div id="paymentsList" className="space-y-2 mb-4">
                            {payments.map((p, index) => (
                                <div key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded-md">
                                    <span>{p.method.charAt(0).toUpperCase() + p.method.slice(1)}</span>
                                    <span>R$ {p.value.toFixed(2)}</span>
                                    <button onClick={() => handleRemovePayment(index)} className="text-red-500 font-bold">&times;</button>
                                </div>
                            ))}
                        </div>
                        {remainingAmount > 0.001 && (
                            <div className="flex items-center gap-2 mb-4">
                                <select value={currentMethod} onChange={e => setCurrentMethod(e.target.value)} className="p-2 border rounded-md w-1/2 bg-white">
                                    <option value="dinheiro">Dinheiro</option>
                                    <option value="pix">PIX</option>
                                    <option value="credito">Crédito</option>
                                    <option value="debito">Débito</option>
                                </select>
                                <input type="number" step="0.01" value={currentValue} onChange={e => setCurrentValue(e.target.value)} placeholder="Valor" className="p-2 border rounded-md w-1/2" />
                                <button type="button" onClick={handleAddPayment} className="p-2 bg-blue-500 text-white rounded-md font-bold">+</button>
                            </div>
                        )}
                        <p className={`text-xl font-bold text-center mb-4 ${remainingAmount > 0.001 ? 'text-red-600' : 'text-green-600'}`}>
                            {remainingAmount > 0.001 ? `Faltam R$ ${remainingAmount.toFixed(2)}` : 'Total Pago!'}
                        </p>
                        {currentMethod === 'dinheiro' && remainingAmount > 0.001 && (
                            <div className="mt-4 p-4 bg-blue-50 rounded-lg space-y-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Valor Recebido</label>
                                    <input type="number" step="0.01" value={amountReceived} onChange={e => setAmountReceived(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-2xl p-2 text-center" />
                                </div>
                                <p className="flex justify-between text-lg font-semibold">
                                    <span>Troco:</span>
                                    <strong className="text-blue-600">R$ {change > 0 ? change.toFixed(2) : '0.00'}</strong>
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="p-4 bg-gray-50 flex gap-4">
                    <button type="button" onClick={onClose} className="flex-1 py-2 px-4 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300">Cancelar</button>
                    <button type="button" onClick={handleFinalizeCheckout} disabled={remainingAmount > 0.001 || isSaving} className="flex-1 py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-gray-400">
                        {isSaving ? 'A finalizar...' : 'Confirmar Pagamento'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutModal;