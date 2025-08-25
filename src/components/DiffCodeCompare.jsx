import { useState } from "react";
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer-continued";


/**
* 1) 탭 목록에 "diff" 추가 (기존 코드의 탭 배열을 이걸로 교체)
* ["overview","controller","service","serviceimpl","vo","reports","reports_json","diff"]
*
* 2) 탭 콘텐츠 영역에 아래 컴포넌트 렌더링 추가
* {tab === "diff" && <DiffCodeCompare />}
*
* 3) getTabIcon("diff") 아이콘 추가 (아래 보조 함수 참고)
*/


export function DiffCodeCompare() {
// 간단한 테스트용 코드 (추후 실제 소스코드로 교체)
const [left, setLeft] = useState(
`
package net.java.amateras.db.visual.editpart;

import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.util.ArrayList;
import java.util.List;

import net.java.amateras.db.visual.model.AbstractDBConnectionModel;
import net.java.amateras.db.visual.model.AbstractDBEntityModel;
import net.java.amateras.db.visual.model.RootModel;

import org.eclipse.draw2d.ChopboxAnchor;
import org.eclipse.draw2d.ConnectionAnchor;
import org.eclipse.draw2d.geometry.Rectangle;
import org.eclipse.gef.ConnectionEditPart;
import org.eclipse.gef.EditPart;
import org.eclipse.gef.EditPolicy;
import org.eclipse.gef.GraphicalEditPart;
import org.eclipse.gef.NodeEditPart;
import org.eclipse.gef.Request;
import org.eclipse.gef.commands.Command;
import org.eclipse.gef.editpolicies.ComponentEditPolicy;
import org.eclipse.gef.editpolicies.GraphicalNodeEditPolicy;
import org.eclipse.gef.editpolicies.LayoutEditPolicy;
import org.eclipse.gef.editpolicies.NonResizableEditPolicy;
import org.eclipse.gef.requests.CreateConnectionRequest;
import org.eclipse.gef.requests.CreateRequest;
import org.eclipse.gef.requests.GroupRequest;
import org.eclipse.gef.requests.ReconnectRequest;

public abstract class AbstractDBEntityEditPart extends AbstractDBEditPart implements NodeEditPart {

	/**
	 * Creats a {@link CreateConnectionCommand} instance.
	 * Override to return an instance of extended class to customize connection creation.
	 * 
	 * @return the connection creation command
	 */
	protected CreateConnectionCommand newCreateConnectionCommand(){
		return new CreateConnectionCommand();
	}

	protected void refreshVisuals() {
		Object model = getModel();
		if(model instanceof AbstractDBEntityModel){
			Rectangle constraint = ((AbstractDBEntityModel)model).getConstraint();
			((GraphicalEditPart) getParent()).setLayoutConstraint(this,getFigure(), constraint);
		}
	}
	protected void createEditPolicies() {
		installEditPolicy(EditPolicy.COMPONENT_ROLE,new TableComponentEditPolicy());
		installEditPolicy(EditPolicy.GRAPHICAL_NODE_ROLE,new NodeEditPolicy());
		installEditPolicy(EditPolicy.LAYOUT_ROLE, new EntityLayoutEditPolicy());
//		installEditPolicy(EditPolicy.DIRECT_EDIT_ROLE, new EntityDirectEditPolicy());
	}

	protected List<AbstractDBConnectionModel> getModelSourceConnections() {
		return ((AbstractDBEntityModel) getModel()).getModelSourceConnections();
	}

	protected List<AbstractDBConnectionModel> getModelTargetConnections() {
		return ((AbstractDBEntityModel) getModel()).getModelTargetConnections();
	}

	public ConnectionAnchor getSourceConnectionAnchor(ConnectionEditPart connection) {
		return new ChopboxAnchor(getFigure());
	}

	public ConnectionAnchor getSourceConnectionAnchor(Request request) {
		return new ChopboxAnchor(getFigure());
	}

	public ConnectionAnchor getTargetConnectionAnchor(ConnectionEditPart connection) {
		return new ChopboxAnchor(getFigure());
	}

	public ConnectionAnchor getTargetConnectionAnchor(Request request) {
		return new ChopboxAnchor(getFigure());
	}

	@SuppressWarnings("unchecked")
	public void propertyChange(PropertyChangeEvent evt) {
		refreshVisuals();
		refreshSourceConnections();
		refreshTargetConnections();

		invokePropertyChangeListener(evt, getSourceConnections());
		invokePropertyChangeListener(evt, getTargetConnections());
	}

	private void invokePropertyChangeListener(PropertyChangeEvent evt, List<PropertyChangeListener> listeners){
		for(PropertyChangeListener listener: listeners){
			listener.propertyChange(evt);
		}
	}
	
	private class TableComponentEditPolicy extends ComponentEditPolicy {
		
		protected Command createDeleteCommand(GroupRequest deleteRequest) {
			DeleteCommand command = new DeleteCommand();
			command.setRootModel(getHost().getParent().getModel());
			command.setTargetModel(getHost().getModel());
			return command;
		}
		
	}
	
	private class DeleteCommand extends Command {
		
		private RootModel root;
		private AbstractDBEntityModel model;
		
		private List<AbstractDBConnectionModel> sourceConnections = new ArrayList<AbstractDBConnectionModel>();
		private List<AbstractDBConnectionModel> targetConnections = new ArrayList<AbstractDBConnectionModel>();
		
		public void execute() {
			sourceConnections.addAll(model.getModelSourceConnections());
			targetConnections.addAll(model.getModelTargetConnections());
			for (int i = 0; i < sourceConnections.size(); i++) {
				AbstractDBConnectionModel model = sourceConnections.get(i);
				model.detachSource();
				model.detachTarget();
			}
			for (int i = 0; i < targetConnections.size(); i++) {
				AbstractDBConnectionModel model = targetConnections.get(i);
				model.detachSource();
				model.detachTarget();
			}
			root.removeChild(model);
		}
		
		public void setRootModel(Object root) {
			this.root = (RootModel) root;
		}
		
		public void setTargetModel(Object model) {
			this.model = (AbstractDBEntityModel) model;
		}
		
		public void undo(){
			root.addChild(model);
			for (int i = 0; i < sourceConnections.size(); i++) {
				AbstractDBConnectionModel model = (AbstractDBConnectionModel) sourceConnections.get(i);
				model.attachSource();
				model.attachTarget();
			}
			for (int i = 0; i < targetConnections.size(); i++) {
				AbstractDBConnectionModel model = (AbstractDBConnectionModel) targetConnections.get(i);
				model.attachSource();
				model.attachTarget();
			}
			sourceConnections.clear();
			targetConnections.clear();
		}
	}
	
	private class NodeEditPolicy extends GraphicalNodeEditPolicy {
		
		protected Command getConnectionCompleteCommand(CreateConnectionRequest request) {
			AbstractDBConnectionModel conn = ((CreateConnectionCommand)request.getStartCommand()).getConnectionModel();
			AbstractDBEntityModel model = (AbstractDBEntityModel)getHost().getModel();
			if(!model.canTarget(conn)){
				return null;
			}
			CreateConnectionCommand command = (CreateConnectionCommand) request.getStartCommand();
			command.setTarget(model);
			return command;
		}
		
		protected Command getConnectionCreateCommand(CreateConnectionRequest request) {
			AbstractDBConnectionModel conn = (AbstractDBConnectionModel)request.getNewObject();
			AbstractDBEntityModel model = (AbstractDBEntityModel)getHost().getModel();
			if(!model.canSource(conn)){
				return null;
			}
			CreateConnectionCommand command = newCreateConnectionCommand();
			command.setModel(getModel());
			command.setConnection(conn);
			command.setSource(model);
			request.setStartCommand(command);
			return command;
		}
		
		protected Command getReconnectTargetCommand(ReconnectRequest request) {
			AbstractDBConnectionModel conn = (AbstractDBConnectionModel)request.getConnectionEditPart().getModel();
			AbstractDBEntityModel model = (AbstractDBEntityModel)getHost().getModel();
			if(!model.canTarget(conn)){
				return null;
			}
			ReconnectTargetCommand command = new ReconnectTargetCommand();
			command.setConnection(conn);
			command.setTarget(model);
			return command;
		}
		
		protected Command getReconnectSourceCommand(ReconnectRequest request) {
			AbstractDBConnectionModel conn = (AbstractDBConnectionModel)request.getConnectionEditPart().getModel();
			AbstractDBEntityModel model = (AbstractDBEntityModel)getHost().getModel();
			if(!model.canSource(conn)){
				return null;
			}
			ReconnectSourceCommand command = new ReconnectSourceCommand();
			command.setConnection(conn);
			command.setSource(model);
			return command;
		}
	}
	
	protected static class CreateConnectionCommand extends Command {
		
		protected Object model;
		protected AbstractDBEntityModel source;
		protected AbstractDBEntityModel target;
		protected AbstractDBConnectionModel connection;
		
		public void setModel(Object model){
			this.model = model;
		}
		
		public Object getModel(){
			return this.model;
		}
		
		public AbstractDBConnectionModel getConnectionModel(){
			return connection;
		}
		
		public boolean canExecute() {
			if (source == null || target == null){
				return false;
			}
			if (source == target){
				return false;
			}
			return true;
		}
		
		public void execute() {
			connection.attachSource();
			connection.attachTarget();
		}
		
		public void setConnection(Object model) {
			connection = (AbstractDBConnectionModel) model;
		}
		
		public void setSource(Object model) {
			source = (AbstractDBEntityModel) model;
			connection.setSource(source);
		}
		
		public void setTarget(Object model) {
			target = (AbstractDBEntityModel) model;
			connection.setTarget(target);
		}
		
		public void undo() {
			connection.detachSource();
			connection.detachTarget();
		}
	}
	
	private class ReconnectTargetCommand extends Command {
		
		private AbstractDBEntityModel target;
		private AbstractDBEntityModel oldTarget;
		private AbstractDBConnectionModel connection;
		
		public void execute() {
			connection.detachTarget();
			connection.setTarget(target);
			connection.attachTarget();
		}
		
		public void setConnection(Object model) {
			connection = (AbstractDBConnectionModel) model;
			oldTarget = connection.getTarget();
		}
		
		public void setTarget(Object model) {
			target = (AbstractDBEntityModel) model;
		}
		
		public boolean canExecute() {
			if (connection.getSource() == null || target == null){
				return false;
			}
			if (connection.getSource().equals(target)){
				return false;
			}
			return true;
		}
		
		public void undo() {
			connection.detachTarget();
			connection.setTarget(oldTarget);
			connection.attachTarget();
		}
	}
	
	private class ReconnectSourceCommand extends Command {
		
		private AbstractDBEntityModel source;
		private AbstractDBEntityModel oldSource;
		private AbstractDBConnectionModel connection;
		
		public void execute() {
			connection.detachSource();
			connection.setSource(source);
			connection.attachSource();
		}
		
		public void setConnection(Object model) {
			connection = (AbstractDBConnectionModel) model;
			oldSource = connection.getSource();
		}
		
		public void setSource(Object model) {
			source = (AbstractDBEntityModel) model;
		}
		
		public boolean canExecute() {
			if (connection.getTarget() == null || source == null){
				return false;
			}
			if (connection.getTarget().equals(source)){
				return false;
			}
			return true;
		}
		
		public void undo() {
			connection.detachSource();
			connection.setSource(oldSource);
			connection.attachSource();
		}
	}
	
	private class EntityLayoutEditPolicy extends LayoutEditPolicy {
		
		protected Command getMoveChildrenCommand(Request request) {
			return null;
		}

		protected EditPolicy createChildEditPolicy(EditPart child) {
			return new NonResizableEditPolicy();
		}
		
		protected Command getCreateCommand(CreateRequest request) {
			return null;
		}
		
		protected Command getDeleteDependantCommand(Request request) {
			return null;
		}
	}
}
    `);
const [right, setRight] = useState(`
package net.java.amateras.db.visual.editpart;

import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import net.java.amateras.db.visual.model.AbstractDBConnectionModel;
import net.java.amateras.db.visual.model.AbstractDBEntityModel;
import net.java.amateras.db.visual.model.RootModel;

import org.eclipse.draw2d.ChopboxAnchor;
import org.eclipse.draw2d.ConnectionAnchor;
import org.eclipse.draw2d.geometry.Rectangle;
import org.eclipse.gef.ConnectionEditPart;
import org.eclipse.gef.EditPart;
import org.eclipse.gef.EditPolicy;
import org.eclipse.gef.GraphicalEditPart;
import org.eclipse.gef.NodeEditPart;
import org.eclipse.gef.Request;
import org.eclipse.gef.commands.Command;
import org.eclipse.gef.editpolicies.ComponentEditPolicy;
import org.eclipse.gef.editpolicies.GraphicalNodeEditPolicy;
import org.eclipse.gef.editpolicies.LayoutEditPolicy;
import org.eclipse.gef.editpolicies.NonResizableEditPolicy;
import org.eclipse.gef.requests.CreateConnectionRequest;
import org.eclipse.gef.requests.CreateRequest;
import org.eclipse.gef.requests.GroupRequest;
import org.eclipse.gef.requests.ReconnectRequest;

public abstract class AbstractDBEntityEditPart extends AbstractDBEditPart implements NodeEditPart {

    /**
     * Creates a {@link CreateConnectionCommand} instance.
     * Override to return an instance of extended class to customize connection creation.
     */
    protected CreateConnectionCommand newCreateConnectionCommand() {
        return new CreateConnectionCommand();
    }

    @Override
    protected void refreshVisuals() {
        Object model = getModel();
        if (model instanceof AbstractDBEntityModel) {
            Rectangle constraint = ((AbstractDBEntityModel) model).getConstraint();
            ((GraphicalEditPart) getParent()).setLayoutConstraint(this, getFigure(), constraint);
        }
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     

    @Override
    protected void createEditPolicies() {
        installEditPolicy(EditPolicy.COMPONENT_ROLE, new TableComponentEditPolicy());
        installEditPolicy(EditPolicy.GRAPHICAL_NODE_ROLE, new NodeEditPolicy());
        installEditPolicy(EditPolicy.LAYOUT_ROLE, new EntityLayoutEditPolicy());
        // installEditPolicy(EditPolicy.DIRECT_EDIT_ROLE, new EntityDirectEditPolicy());
    }

    @Override
    protected List<AbstractDBConnectionModel> getModelSourceConnections() {
        return ((AbstractDBEntityModel) getModel()).getModelSourceConnections();
    }

    @Override
    protected List<AbstractDBConnectionModel> getModelTargetConnections() {
        return ((AbstractDBEntityModel) getModel()).getModelTargetConnections();
    }

    @Override
    public ConnectionAnchor getSourceConnectionAnchor(ConnectionEditPart connection) {
        return new ChopboxAnchor(getFigure());
    }

    @Override
    public ConnectionAnchor getSourceConnectionAnchor(Request request) {
        return new ChopboxAnchor(getFigure());
    }

    @Override
    public ConnectionAnchor getTargetConnectionAnchor(ConnectionEditPart connection) {
        return new ChopboxAnchor(getFigure());
    }

    @Override
    public ConnectionAnchor getTargetConnectionAnchor(Request request) {
        return new ChopboxAnchor(getFigure());
    }

    @Override
    @SuppressWarnings("unchecked")
    public void propertyChange(PropertyChangeEvent evt) {
        refreshVisuals();
        refreshSourceConnections();
        refreshTargetConnections();

        invokePropertyChangeListener(evt, getSourceConnections());
        invokePropertyChangeListener(evt, getTargetConnections());
    }

    @SuppressWarnings("unchecked")
    private void invokePropertyChangeListener(PropertyChangeEvent evt, List<?> listeners) {
        for (Object l : listeners) {
            if (l instanceof PropertyChangeListener) {
                ((PropertyChangeListener) l).propertyChange(evt);
            }
        }
    }

    private class TableComponentEditPolicy extends ComponentEditPolicy {
        @Override
        protected Command createDeleteCommand(GroupRequest deleteRequest) {
            DeleteCommand command = new DeleteCommand();
            command.setRootModel(getHost().getParent().getModel());
            command.setTargetModel(getHost().getModel());
            return command;
        }
    }

    private static class DeleteCommand extends Command {

        private RootModel root;
        private AbstractDBEntityModel model;

        private final List<AbstractDBConnectionModel> sourceConnections = new ArrayList<>();
        private final List<AbstractDBConnectionModel> targetConnections = new ArrayList<>();

        @Override
        public void execute() {
            if (model == null || root == null) return;

            sourceConnections.addAll(model.getModelSourceConnections());
            targetConnections.addAll(model.getModelTargetConnections());

            for (AbstractDBConnectionModel c : sourceConnections) {
                c.detachSource();
                c.detachTarget();
            }
            for (AbstractDBConnectionModel c : targetConnections) {
                c.detachSource();
                c.detachTarget();
            }
            root.removeChild(model);
        }

        public void setRootModel(Object root) {
            if (root instanceof RootModel) {
                this.root = (RootModel) root;
            }
        }

        public void setTargetModel(Object model) {
            if (model instanceof AbstractDBEntityModel) {
                this.model = (AbstractDBEntityModel) model;
            }
        }

        @Override
        public void undo() {
            if (model == null || root == null) return;

            root.addChild(model);

            for (AbstractDBConnectionModel c : sourceConnections) {
                c.attachSource();
                c.attachTarget();
            }
            for (AbstractDBConnectionModel c : targetConnections) {
                c.attachSource();
                c.attachTarget();
            }
            sourceConnections.clear();
            targetConnections.clear();
        }
    }

    private class NodeEditPolicy extends GraphicalNodeEditPolicy {

        @Override
        protected Command getConnectionCompleteCommand(CreateConnectionRequest request) {
            Command start = request.getStartCommand();
            if (!(start instanceof CreateConnectionCommand)) return null;

            AbstractDBConnectionModel conn = ((CreateConnectionCommand) start).getConnectionModel();
            AbstractDBEntityModel entity = (AbstractDBEntityModel) getHost().getModel();
            if (!entity.canTarget(conn)) return null;

            CreateConnectionCommand cmd = (CreateConnectionCommand) start;
            cmd.setTarget(entity);
            return cmd;
        }

        @Override
        protected Command getConnectionCreateCommand(CreateConnectionRequest request) {
            Object newObj = request.getNewObject();
            if (!(newObj instanceof AbstractDBConnectionModel)) return null;

            AbstractDBConnectionModel conn = (AbstractDBConnectionModel) newObj;
            AbstractDBEntityModel entity = (AbstractDBEntityModel) getHost().getModel();
            if (!entity.canSource(conn)) return null;

            CreateConnectionCommand cmd = newCreateConnectionCommand();
            cmd.setModel(getModel());
            cmd.setConnection(conn);
            cmd.setSource(entity);
            request.setStartCommand(cmd);
            return cmd;
        }

        @Override
        protected Command getReconnectTargetCommand(ReconnectRequest request) {
            Object m = request.getConnectionEditPart().getModel();
            if (!(m instanceof AbstractDBConnectionModel)) return null;

            AbstractDBConnectionModel conn = (AbstractDBConnectionModel) m;
            AbstractDBEntityModel entity = (AbstractDBEntityModel) getHost().getModel();
            if (!entity.canTarget(conn)) return null;

            ReconnectTargetCommand cmd = new ReconnectTargetCommand();
            cmd.setConnection(conn);
            cmd.setTarget(entity);
            return cmd;
        }

        @Override
        protected Command getReconnectSourceCommand(ReconnectRequest request) {
            Object m = request.getConnectionEditPart().getModel();
            if (!(m instanceof AbstractDBConnectionModel)) return null;

            AbstractDBConnectionModel conn = (AbstractDBConnectionModel) m;
            AbstractDBEntityModel entity = (AbstractDBEntityModel) getHost().getModel();
            if (!entity.canSource(conn)) return null;

            ReconnectSourceCommand cmd = new ReconnectSourceCommand();
            cmd.setConnection(conn);
            cmd.setSource(entity);
            return cmd;
        }
    }

    protected static class CreateConnectionCommand extends Command {

        protected Object model;
        protected AbstractDBEntityModel source;
        protected AbstractDBEntityModel target;
        protected AbstractDBConnectionModel connection;

        public void setModel(Object model) {
            this.model = model;
        }

        public Object getModel() {
            return this.model;
        }

        public AbstractDBConnectionModel getConnectionModel() {
            return connection;
        }

        @Override
        public boolean canExecute() {
            if (source == null || target == null) return false;
            return source != target;
        }

        @Override
        public void execute() {
            if (connection == null) return;
            connection.attachSource();
            connection.attachTarget();
        }

        public void setConnection(Object model) {
            if (model instanceof AbstractDBConnectionModel) {
                connection = (AbstractDBConnectionModel) model;
            }
        }

        public void setSource(Object model) {
            if (model instanceof AbstractDBEntityModel) {
                source = (AbstractDBEntityModel) model;
                if (connection != null) {
                    connection.setSource(source);
                }
            }
        }

        public void setTarget(Object model) {
            if (model instanceof AbstractDBEntityModel) {
                target = (AbstractDBEntityModel) model;
                if (connection != null) {
                    connection.setTarget(target);
                }
            }
        }

        @Override
        public void undo() {
            if (connection == null) return;
            connection.detachSource();
            connection.detachTarget();
        }
    }

    private static class ReconnectTargetCommand extends Command {

        private AbstractDBEntityModel target;
        private AbstractDBEntityModel oldTarget;
        private AbstractDBConnectionModel connection;

        @Override
        public void execute() {
            if (connection == null || target == null) return;
            connection.detachTarget();
            connection.setTarget(target);
            connection.attachTarget();
        }

        public void setConnection(Object model) {
            if (model instanceof AbstractDBConnectionModel) {
                connection = (AbstractDBConnectionModel) model;
                oldTarget = connection.getTarget();
            }
        }

        public void setTarget(Object model) {
            if (model instanceof AbstractDBEntityModel) {
                target = (AbstractDBEntityModel) model;
            }
        }

        @Override
        public boolean canExecute() {
            if (connection == null || connection.getSource() == null || target == null) return false;
            return !Objects.equals(connection.getSource(), target);
        }

        @Override
        public void undo() {
            if (connection == null) return;
            connection.detachTarget();
            connection.setTarget(oldTarget);
            connection.attachTarget();
        }
    }

    private static class ReconnectSourceCommand extends Command {

        private AbstractDBEntityModel source;
        private AbstractDBEntityModel oldSource;
        private AbstractDBConnectionModel connection;

        @Override
        public void execute() {
            if (connection == null || source == null) return;
            connection.detachSource();
            connection.setSource(source);
            connection.attachSource();
        }

        public void setConnection(Object model) {
            if (model instanceof AbstractDBConnectionModel) {
                connection = (AbstractDBConnectionModel) model;
                oldSource = connection.getSource();
            }
        }

        public void setSource(Object model) {
            if (model instanceof AbstractDBEntityModel) {
                source = (AbstractDBEntityModel) model;
            }
        }

        @Override
        public boolean canExecute() {
            if (connection == null || connection.getTarget() == null || source == null) return false;
            return !Objects.equals(connection.getTarget(), source);
        }

        @Override
        public void undo() {
            if (connection == null) return;
            connection.detachSource();
            connection.setSource(oldSource);
            connection.attachSource();
        }
    }

    private static class EntityLayoutEditPolicy extends LayoutEditPolicy {

        @Override
        protected Command getMoveChildrenCommand(Request request) {
            return null;
        }

        @Override
        protected EditPolicy createChildEditPolicy(EditPart child) {
            return new NonResizableEditPolicy();
        }

        @Override
        protected Command getCreateCommand(CreateRequest request) {
            return null;
        }

        @Override
        protected Command getDeleteDependantCommand(Request request) {
            return null;
        }
    }
}

    `);


const [splitView, setSplitView] = useState(true); // side-by-side vs inline
const [hideUnchanged, setHideUnchanged] = useState(false);


return (
<section className="modern-card" style={{ overflow: "hidden" }}>
<div className="card-content" style={{ display: "grid", gap: 16 }}>
{/* 헤더 */}
<div className="json-header" style={{ alignItems: "center", display: "flex", gap: 12 }}>
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={20} height={20}>
<path d="M3 6h13M3 12h13M3 18h13M18 6l3 3-3 3" />
</svg>
<h4 style={{ margin: 0 }}>소스 코드 비교</h4>
</div>


{/* 옵션 영역 */}
{/* <div className="toolbar" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
<label className="switch" style={{ display: "flex", alignItems: "center", gap: 8 }}>
<input
type="checkbox"
checked={splitView}
onChange={(e) => setSplitView(e.target.checked)}
/>
<span>Side-by-side 보기</span>
</label>


<label className="switch" style={{ display: "flex", alignItems: "center", gap: 8 }}>
<input
type="checkbox"
checked={hideUnchanged}
onChange={(e) => setHideUnchanged(e.target.checked)}
/>
<span>변경 없는 라인 숨기기</span>
</label>
</div> */}


{/* 편집 영역 */}
{/* <div style={{ display: "grid", gridTemplateColumns: splitView ? "1fr 1fr" : "1fr", gap: 12 }}>
<div className="editor-pane">
<div className="editor-label">왼쪽(이전) 코드</div>
<textarea
value={left}
onChange={(e) => setLeft(e.target.value)}
spellCheck={false}
// style={{ width: "100%", height: 160, fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}
/>
</div>
<div className="editor-pane">
<div className="editor-label">오른쪽(이후) 코드</div>
<textarea
value={right}
onChange={(e) => setRight(e.target.value)}
spellCheck={false}
// style={{ width: "100%", height: 160, fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace" }}
/>
</div>
</div> */}


{/* Diff 뷰어 */}
<div className="diff-viewer">
  {splitView ? (
    <div className="diff-header-split">
      <span className="file-name">AbstractDBEntityEditPart3.20.java</span>
      <span className="file-name">AbstractDBEntityEditPart4.3.java</span>
    </div>
  ) : (
    <div className="diff-header-inline">
      <span className="file-name">AbstractDBEntityEditPart.java (before → after)</span>
    </div>
  )}
<ReactDiffViewer
oldValue={left}
newValue={right}
splitView={splitView}
hideLineNumbers={false}
disableWordDiff={false}
compareMethod={DiffMethod.WORDS}       // ← 핵심: 단어 기준
useDarkTheme={false}
showDiffOnly={hideUnchanged}
styles={{
    line: {
      lineHeight: "1.0",
      padding: "0 0",       // 위/아래 여백 줄이기
    },
    contentText: {
      lineHeight: "1.0",
      fontSize: "10px",
    },
    gutter: {
      lineHeight: "1.0",
      fontSize: "10px",
    },
  }}
/>
</div>
</div>
</section>
)}

/**
* 보조: 탭 아이콘 생성기 (기존 getTabIcon에 아래 case 추가)
*/
export function DiffTabIcon() {
return (
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={16} height={16}>
<path d="M8 7h8M8 12h8M8 17h8" />
<path d="M5 5l-2 2 2 2M19 15l2 2-2 2" />
</svg>
);
}