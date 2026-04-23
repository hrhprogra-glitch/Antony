import type { Usuario } from '../types';

interface Props {
  usuarios: Usuario[];
  onEdit: (usuario: Usuario) => void;
  onDelete: (id: string) => void;
}

export function UsuariosTable({ usuarios, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-x-auto mt-6">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b-2 border-black">
            <th className="px-4 py-4 text-[11px] text-neutral-500 font-bold uppercase tracking-widest">Nombre y Correo</th>
            <th className="px-4 py-4 text-[11px] text-neutral-500 font-bold uppercase tracking-widest">Rol de Acceso</th>
            <th className="px-4 py-4 text-[11px] text-neutral-500 font-bold uppercase tracking-widest">Estado</th>
            <th className="px-4 py-4 text-[11px] text-neutral-500 font-bold uppercase tracking-widest text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-(--border-color) text-sm">
          {usuarios.map((u) => (
            <tr key={u.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors">
              <td className="px-4 py-5">
                <div className="font-bold text-(--text-main)">{u.nombre}</div>
                <div className="text-[11px] font-mono text-neutral-500 mt-1">{u.email}</div>
              </td>
              <td className="px-4 py-5">
                <span className={`px-2 py-1 text-[10px] font-bold border border-neutral-200 uppercase tracking-wider ${
                  u.rol === 'Administrador' ? 'text-blue-600 border-blue-200' : 
                  u.rol === 'Mecánico' ? 'text-orange-600 border-orange-200' : 'text-neutral-600'
                }`}>
                  {u.rol}
                </span>
              </td>
              <td className="px-4 py-5">
                <span className={`text-[11px] font-black uppercase tracking-widest ${
                  u.estado === 'Activo' ? 'text-emerald-600' : 'text-red-500'
                }`}>
                  {u.estado}
                </span>
              </td>
              <td className="px-4 py-5 text-right space-x-4">
                <button onClick={() => onEdit(u)} className="text-[11px] font-bold text-blue-600 hover:text-blue-800 uppercase tracking-widest transition-colors">
                  Editar
                </button>
                <button onClick={() => onDelete(u.id)} className="text-[11px] font-bold text-red-600 hover:text-red-800 uppercase tracking-widest transition-colors">
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}