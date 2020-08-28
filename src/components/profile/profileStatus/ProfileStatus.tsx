import React, { ChangeEvent } from "react";

type PropsType = {
  status: string;
  updateStatus: (newStatus: string) => void;
};

type StateType = {
  editStatus: boolean;
  status: string;
};

class ProfileStatus extends React.Component<PropsType, StateType> {
  state = {
    editStatus: false,
    status: this.props.status,
  };

  activateMode = () => {
    return this.setState({ editStatus: true });
  };

  deActivateMode = () => {
    this.setState({ editStatus: false });
    this.props.updateStatus(this.state.status);
  };

  onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      status: e.currentTarget.value,
    });
  };

  componentDidUpdate(prevProps: PropsType, prevState: StateType) {
    if (prevProps.status != this.props.status) {
      this.setState({
        status: this.props.status,
      });
    }
  }

  render() {
    return (
      <div>
        {this.state.editStatus ? (
          <div>
            <input
              autoFocus={true}
              onBlur={this.deActivateMode}
              onChange={this.onStatusChange}
              value={this.state.status}
            />
          </div>
        ) : (
          <div onDoubleClick={this.activateMode}>
            {this.props.status || "no status"}
          </div>
        )}
      </div>
    );
  }
}

export default ProfileStatus;
